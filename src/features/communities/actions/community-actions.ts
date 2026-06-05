"use server"

import { requireAuth } from "@/lib/auth-server";
import { CommunitySchema, CommunityType } from "../schemas/comunity-schema";
import { communityService } from "../services/community-service";
import { ActionResponse } from "@/features/auth/types/auth.types";
import { SelectCommunity } from "../types/community.types";

export async function createCommunityAction(input: CommunityType): ActionResponse {
    const zodResponse = CommunitySchema.safeParse(input)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Hubo un error'
        }
    }

    const { session } = await requireAuth()

    if (!session) {
        return {
            success: false,
            message: 'No tienes autenticación para realizarlo'
        }
    }

    await communityService.createCommunity(zodResponse.data, session.user.id)

    return {
        success: true,
        message: 'Comunidad creada correctamente'
    }
}

export async function editCommunityAction(input: CommunityType, communityId: SelectCommunity['id']): ActionResponse {
    const zodResponse = CommunitySchema.safeParse(input)

    if (zodResponse.error) {
        return {
            success: false,
            message: 'Hubo un error'
        }
    }

    const { session } = await requireAuth()

    if (!session) {
        return {
            success: false,
            message: 'No tienes autenticación para realizarlo'
        }
    }

    await communityService.editCommunity(input, session.user, communityId)

    return {
        success: true, 
        message: 'Comunidad actualizada correctamente'
    }
}