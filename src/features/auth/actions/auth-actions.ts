"use server"

import { SignUpSchema, SignUpType } from "../schemas/authSchema";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpType) {
    const zodResponse = SignUpSchema.safeParse(input)

    if (zodResponse.error) {
        return {
            error: 'Hubo un error',
            success: false
        }
    }

    const data = zodResponse.data

    await authService.register(data)

}