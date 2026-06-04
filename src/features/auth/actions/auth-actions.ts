"use server"

import { SignInSchema, SignInType, SignUpSchema, SignUpType } from "../schemas/auth-schema";
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

    const data = zodResponse.data

    const response = await authService.signUp(data)
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

    return await authService.signIn(input)
}