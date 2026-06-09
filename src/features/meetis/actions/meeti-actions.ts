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