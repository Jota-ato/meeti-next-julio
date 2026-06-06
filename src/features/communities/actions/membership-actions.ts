"use server"

import { requireAuth } from "@/lib/auth-server";
import { CommunityId } from "../services/community-repository";
import { membershipService } from "../services/membership-service";

export async function toggleMembershipAction(communityId: CommunityId) { 
    const { session } = await requireAuth()

    if (!session) throw new Error('Usuario no autenticado')

    return await membershipService.toggleMembership(communityId, session.user)
}