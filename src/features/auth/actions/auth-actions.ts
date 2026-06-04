"use server"

import { ForgotPasswordSchema, ForgotPasswordType, SignInSchema, SignInType, SignUpSchema, SignUpType } from "../schemas/auth-schema";
import { authService } from "../services/auth-service";
import { ActionResponse } from "../types/auth.types";

export async function signUpAction(input: SignUpType): ActionResponse {
    const zodResponse = SignUpSchema.safeParse(input)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Ocurrió un error'
        }
    }

    const response = await authService.signUp(zodResponse.data)
    return response
}

export async function signInAction(input: SignInType): ActionResponse { 
    const zodResponse = SignInSchema.safeParse(input)

    if (zodResponse.error) { 
        return {
            success: false,
            message: 'Ocurrió un error'
        }
    }

    return await authService.signIn(zodResponse.data)
}

export async function forgotPasswordAction(input: ForgotPasswordType): ActionResponse { 
    const zodResponse = ForgotPasswordSchema.safeParse(input)

    if (zodResponse.error) { 
        return {
            success: false,
            message: 'Hubo un error'
        }
    }

    return await authService.requestPasswordReset(zodResponse.data)
}