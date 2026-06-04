"use server"

import { requireAuth } from "@/lib/auth-server";
import { CommunitySchema, CommunityType } from "../schemas/comunity-schema";
import { communityService } from "../services/community-service";

export async function createCommunityAction(input: CommunityType) { 
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
}