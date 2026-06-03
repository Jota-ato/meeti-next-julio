import { auth } from "@/lib/auth";
import { SignInType, SignUpType } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { ActionResponse } from "../types/auth.types";
import { headers } from "next/headers";
import { APIError } from "better-auth";

class AuthService {

    constructor(
        private authRepository: IAuthRepository
    ) { }

    async register(credentials: SignUpType): ActionResponse {
        const { name, email, password } = credentials

        // Revisar si el usuario existe
        const userExists = await this.authRepository.userExists(email)
        if (userExists) {
            return {
                success: false,
                message: 'Este email ya está registrado, prueba otro. O inicia sesión'
            }
        }

        // Validación de negocio

        // Manejar el registro
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        return {
            message: 'Cuenta creada correctamente, revisa tu e-mail',
            success: true,
        }
    }

    async signIn(credentials: SignInType): ActionResponse {
        const { email, password } = credentials

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
                    403: 'Tu cuenta no ha sido confirmada aún'
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
}

export const authService = new AuthService(authRepository)