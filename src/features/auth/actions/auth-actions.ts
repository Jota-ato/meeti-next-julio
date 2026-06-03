"use server"

import { SignUpSchema, SignUpType } from "../schemas/authSchema";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpType) {
    const zodResponse = SignUpSchema.safeParse(input)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Ocurrió un error'
        }
    }

    const data = zodResponse.data

    const response = await authService.register(data)
    return response
}