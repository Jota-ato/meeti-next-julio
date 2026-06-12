import { auth } from "@/lib/auth";
import { ForgotPasswordType, ResetPasswordType, SignInType, SignUpType, UpdatePasswordType } from "../schemas/auth-schema";
import { authRepository, IAuthRepository } from "./auth-repository";
import { ActionResponse } from "../types/auth.types";
import { headers } from "next/headers";
import { APIError } from "better-auth";
import { checkPassword } from "@/shared/utils/auth";

/**
 * Service layer responsible for orchestrating authentication workflows.
 * Wraps `better-auth` API calls and translates domain errors into predictable 
 * `ActionResponse` objects tailored for Next.js Server Actions.
 */
class AuthService {
    /**
     * Injects the authentication repository.
     * @param {IAuthRepository} authRepository - Repository for user queries.
     */
    constructor(
        private authRepository: IAuthRepository
    ) { }

    /**
     * Handles the user registration flow via email and password.
     * * @todo Architectural smell: `headers()` is a Next.js specific API. 
     * Pass headers as an argument from the Server Action to keep this service framework-agnostic.
     * * @param {SignUpType} payload - The validated user registration data.
     * @returns {Promise<ActionResponse>} The result of the operation.
     */
    async signUp({ name, email, password }: SignUpType): Promise<ActionResponse> {
        // Verify uniqueness
        const userExists = await this.authRepository.userExists(email)
        if (userExists) {
            return {
                success: false,
                message: 'Este email ya está registrado, prueba otro. O inicia sesión'
            }
        }

        // Handle registration via better-auth
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: '/dashboard'
            },
            headers: await headers(),
        });

        return {
            message: 'Cuenta creada correctamente, revisa tu e-mail',
            success: true,
        }
    }

    /**
     * Authenticates a user using email and password credentials.
     * Maps `better-auth` HTTP errors to localized, user-friendly messages.
     * * @param {SignInType} payload - The validated login credentials.
     * @returns {Promise<ActionResponse>} The result object indicating success or mapped error.
     */
    async signIn({ email, password }: SignInType): Promise<ActionResponse> {
        // Pre-flight check to prevent unnecessary crypto operations if user doesn't exist
        const userExists = await this.authRepository.userExists(email)
        if (!userExists) {
            return {
                success: false,
                message: 'El usuario no existe'
            }
        }

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    rememberMe: true,
                    callbackURL: '/dashboard'
                },
                headers: await headers(),
            });

            return {
                success: true,
                message: 'Inicio de sesión correcto'
            }

        } catch (error) {
            let message = 'Error al iniciar sesión'

            // Type-safe error handling for better-auth exceptions
            if (error instanceof APIError) {
                const messagesMap: Record<number, string> = {
                    401: 'Usuario o contraseña incorrectos',
                    403: 'Tu cuenta no ha sido confirmada aún. Revisa tu email'
                }
                console.error(error.message)
                message = messagesMap[error.statusCode] || message
            }

            return {
                success: false,
                message
            }
        }
    }

    /**
     * Initiates the password reset workflow by sending a recovery email.
     * * @param {ForgotPasswordType} payload - The email address requesting the reset.
     * @returns {Promise<ActionResponse>}
     */
    async requestPasswordReset({ email }: ForgotPasswordType): Promise<ActionResponse> {
        const user = await this.authRepository.userExists(email)

        if (!user) {
            return {
                success: false,
                message: 'El usuario no existe'
            }
        }

        try {
            await auth.api.requestPasswordReset({
                body: { email }
            })
            return {
                success: true,
                message: 'Hemos enviado un email con instrucciones'
            }
        } catch {
            return {
                success: false,
                message: 'Ocurrió un error'
            }
        }
    }

    /**
     * Finalizes the password reset process using a cryptographic token.
     * * @param {ResetPasswordType} payload - Contains the new password.
     * @param {string} token - The secure token extracted from the recovery URL.
     * @returns {Promise<ActionResponse>}
     */
    async setNewPassword({ newPassword }: ResetPasswordType, token: string): Promise<ActionResponse> {
        try {
            await auth.api.resetPassword({
                body: {
                    newPassword,
                    token
                }
            })
            return {
                success: true,
                message: 'Contraseña restablecida correctamente'
            }
        } catch (error) {
            if (error instanceof APIError) {
                return {
                    success: false,
                    message: 'Token no válido o expirado'
                }
            }
            return {
                success: false,
                message: 'Ocurrió un error inesperado'
            }
        }
    }

    async updatePassword(input: UpdatePasswordType) {
        const { currentPassword } = input
        const isValid = await checkPassword(currentPassword)

        if (!isValid) {
            return {
                success: false,
                message: 'La contraseña es incorrecta'
            }
        }

        await auth.api.changePassword({
            body: {
                ...input
            },
            headers: await headers()
        })

        if (input.passwordConfirmation) { 
            await auth.api.revokeOtherSessions({
                headers: await headers()
            })
        }

        return {
            success: true,
            message: 'Contraseña cambiada con éxito'
        }
    }

    async getSessions() { 
        return auth.api.listSessions({
            headers: await headers()
        })
    }

    async getSession() { 
        return auth.api.getSession(
            {
                headers: await headers()
            }
        )
    }
}

export const authService = new AuthService(authRepository)