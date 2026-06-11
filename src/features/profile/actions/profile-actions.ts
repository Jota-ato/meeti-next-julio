"use server"

import { requireAuth } from "@/lib/auth-server";
import { ProfileSchema, ProfileType } from "../schemas/profile-schema";
import { ActionResponse } from "@/features/auth/types/auth.types";
import { profileService } from "../services/profile-service";

export async function updateProfileAction(data: ProfileType): ActionResponse { 
    const { session } = await requireAuth()

    if (!session) { 
        return {
            success: false,
            message: 'Inicia sesión'
        }
    }

    const zodResponse = ProfileSchema.safeParse(data)

    if (zodResponse.error) { 
        return {
            success: false,
            message: 'Ocurrió un error'
        }
    }

    await profileService.updateProfile(data)
    return {
        success: true,
        message: 'Datos atualizados correctamnte'
    }
}