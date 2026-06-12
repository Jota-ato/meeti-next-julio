"use server"
import { rateLimit } from "@/lib/limiter";
import { ForgotPasswordSchema, ForgotPasswordType, ResetPasswordSchema, ResetPasswordType, SignInSchema, SignInType, SignUpSchema, SignUpType, UpdatePasswordSchema, UpdatePasswordType } from "../schemas/auth-schema";
import { authService } from "../services/auth-service";
import { ActionResponse } from "../types/auth.types";
import { getClientIp } from "@/shared/utils/ip";
import { getMinutesDiffFromNow } from "@/shared/utils/date";
import { requireAuth } from "@/lib/auth-server";

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

    const ip = await getClientIp()
    const { success, reset } = await rateLimit.limit(ip)

    if (!success) return {
        success: false,
        message: `Demasiadas solicitudes, intenta nuevamente en ${getMinutesDiffFromNow(reset)} minutos`
    }

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

    const ip = await getClientIp()
    const { success, reset } = await rateLimit.limit(ip)

    if (!success) return {
        success: false,
        message: `Demasiadas solicitudes, intenta nuevamente en ${getMinutesDiffFromNow(reset)} minutos`
    }

    const zodResponse = ForgotPasswordSchema.safeParse(input)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Hubo un error'
        }
    }

    return await authService.requestPasswordReset(zodResponse.data)
}

export async function setNewPasswordAction(input: ResetPasswordType, token: string): ActionResponse {

    const ip = await getClientIp()
    const { success, reset } = await rateLimit.limit(ip)

    if (!success) return {
        success: false,
        message: `Demasiadas solicitudes, intenta nuevamente en ${getMinutesDiffFromNow(reset)} minutos`
    }
    const zodResponse = ResetPasswordSchema.safeParse(input)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Hubo un error'
        }
    }

    return await authService.setNewPassword(input, token)
}

export async function updatePasswordAction(input: UpdatePasswordType): ActionResponse { 

    const { session } = await requireAuth()
    const zodResponse = UpdatePasswordSchema.safeParse(input)


    if (!session || zodResponse.error) return {
        success: false,
        message: 'Ocurrió un error'
    }

    return await authService.updatePassword(input)
}