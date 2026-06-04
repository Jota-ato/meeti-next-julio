import { auth } from "@/lib/auth";
import { ForgotPasswordType, ResetPasswordType, SignInType, SignUpType } from "../schemas/auth-schema";
import { authRepository, IAuthRepository } from "./auth-repository";
import { ActionResponse } from "../types/auth.types";
import { headers } from "next/headers";
import { APIError } from "better-auth";

class AuthService {

    constructor(
        private authRepository: IAuthRepository
    ) { }

    async signUp({ name, email, password }: SignUpType): ActionResponse {
        // Revisar si el usuario existe
        const userExists = await this.authRepository.userExists(email)
        if (userExists) {
            return {
                success: false,
                message: 'Este email ya está registrado, prueba otro. O inicia sesión'
            }
        }

        // Manejar el registro
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

    async signIn({ email, password }: SignInType): ActionResponse {
        // Revisar si el no usuario existe
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
            let message = 'Error al iniciar sesion'


            if (error instanceof APIError) {
                const messagesMap: Record<number, string> = {
                    401: 'Usuario o contraseña incorrectos',
                    403: 'Tu cuenta no ha sido confirmada aún. Revisa tu email'
                }
                console.error(error.message)
                message = messagesMap[error.statusCode]
            }

            return {
                success: false,
                message
            }
        }
    }

    async requestPasswordReset({ email }: ForgotPasswordType): ActionResponse {
        const user = await this.authRepository.userExists(email)

        if (!user) {
            return {
                success: false,
                message: 'El usuario no existe'
            }
        }

        try {
            await auth.api.requestPasswordReset({
                body: {
                    email
                }
            })
            return {
                success: true,
                message: 'Hemos enviado un email con instrucciones'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Ocurrió un error'
            }
        }
    }

    async setNewNewPassword({ newPassword }: ResetPasswordType, token: string): ActionResponse { 
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
                message: ''
            }
        }
    }
}

export const authService = new AuthService(authRepository)