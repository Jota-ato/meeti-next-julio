import { User } from "@/features/auth/types/auth.types";
import { CommunityId } from "./community-repository";
import { db } from "@/db";
import { communityMembers } from "@/db/schema/community";
import { and, eq } from "drizzle-orm";

/**
 * Interface defining the contract for Membership data persistence.
 * Isolates the logic for joining, leaving, and validating community memberships.
 */
export interface IMembershipRepository {
    addMember: (communityId: CommunityId, userId: User['id']) => Promise<void>
    removeMember: (communityId: CommunityId, userId: User['id']) => Promise<void>
    isMember: (communityId: CommunityId, userId: User['id']) => Promise<boolean>
}

/**
 * Concrete implementation of the Membership Repository using Drizzle ORM.
 * Manages the many-to-many relationship table between users and communities.
 * @implements {IMembershipRepository}
 */
class MembershipRepository implements IMembershipRepository {
    /**
     * Associates a user with a community by inserting a membership record.
     * @param {CommunityId} communityId - The ID of the target community.
     * @param {User['id']} userId - The ID of the user joining the community.
     * @returns {Promise<void>}
     */
    async addMember(communityId: CommunityId, userId: User['id']): Promise<void> {
        await db
            .insert(communityMembers)
            .values({
                communityId,
                userId
            })
    }

    /**
     * Removes a user's membership from a community (hard delete of the relation).
     * @param {CommunityId} communityId - The ID of the community.
     * @param {User['id']} userId - The ID of the user leaving the community.
     * @returns {Promise<void>}
     */
    async removeMember(communityId: CommunityId, userId: User['id']): Promise<void> {
        await db
            .delete(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId),
                    eq(communityMembers.userId, userId)
                )
            )
    }

    /**
     * Checks if a user is an active member of a specific community.
     * * @performance Consider refactoring to use a `count()` query or `limit(1)` in the future 
     * to avoid fetching full row data into Node.js memory just for a boolean check.
     * * @param {CommunityId} communityId - The ID of the community.
     * @param {User['id']} userId - The ID of the user to check.
     * @returns {Promise<boolean>} True if the membership record exists, false otherwise.
     */
    async isMember(communityId: CommunityId, userId: User['id']): Promise<boolean> {
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