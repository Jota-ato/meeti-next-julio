import { User } from "@/features/auth/types/auth.types";
import { CommunityId } from "./community-repository";
import { db } from "@/db";
import { communityMembers } from "@/db/schema/community";
import { and, eq } from "drizzle-orm";

export interface IMembershipRepository {
    addMember: (communityId: CommunityId, userId: User['id']) => Promise<void>
    removeMember: (communityId: CommunityId, userId: User['id']) => Promise<void>
    isMember: (communityId: CommunityId, userId: User['id']) => Promise<boolean>
}

class MembershipRepository implements IMembershipRepository {
    async addMember(communityId: CommunityId, userId: User['id']) {
        await db
            .insert(communityMembers)
            .values({
                communityId,
                userId
            })
    }

    async removeMember(communityId: CommunityId, userId: User['id']) { 
        await db
            .delete(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId)
                )
            )
    }

    async isMember(communityId: CommunityId, userId: User['id']) {
        return (await db
            .select()
            .from(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId),
                )
        )).length > 0
    }
}

export const membershipRepository = new MembershipRepository()