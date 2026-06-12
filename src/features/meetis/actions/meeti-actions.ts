"use server"

import { ActionResponse } from "@/features/auth/types/auth.types";
import { MeetiSchema, MeetiType } from "../schemas/meeti-schema";
import { requireAuth } from "@/lib/auth-server";
import { meetiService } from "../sevices/meeti-service";

export async function createMeetiAction(data: MeetiType): ActionResponse {

    const { session } = await requireAuth()
    if (!session) {
        return {
            success: false,
            message: 'No hay autenticación'
        }
    }

    const zodResponse = MeetiSchema.safeParse(data)
    if (!zodResponse.success) {
        return {
            success: false,
            message: 'hubo un error'
        }
    }

    await meetiService.createMeeti(data, session.user)

    return {
        success: true,
        message: `Meeti ${data.title} creada con éxito`
    }
}

export async function updateMeetiAction(meetiId: string, data: MeetiType): ActionResponse {
    const zodResponse = MeetiSchema.safeParse(data)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Ocurrió un error'
        }
    }

    const { session } = await requireAuth()
    if (!session) {
        return {
            success: false,
            message: 'Inicia sessión'
        }
    }

    const meeti = await meetiService.updateMeeti(meetiId, data, session.user)
    if (meeti) {
        return {
            success: true,
            message: 'Meeti actualizado con éxito'
        }
    }
    return {
        success: false,
        message: 'Ocurrió un error'
    }
}

export async function deleteMeetiAction(meetiId: string): ActionResponse {
    const { session } = await requireAuth()
    if (!session) {
        return {
            success: false,
            message: 'Inicia sessión'
        }
    }

    await meetiService.deleteMeeti(meetiId, session.user)

    return {
        success: true,
        message: 'Meeti eliminado con éxito'
    }
}