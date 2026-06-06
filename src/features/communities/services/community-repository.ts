import { db } from "@/db";
import { InsertCommunity, SelectCommunity } from "../types/community.types";
import { community } from "@/db/schema/community";
import { User } from "@/features/auth/types/auth.types";
import { eq } from "drizzle-orm";
import { CommunityType } from "../schemas/comunity-schema";

export type CommunityId = SelectCommunity['id']

/**
 * Interface defining the contract for Community data persistence.
 * Ensures dependency inversion for testing and service layer isolation.
 */
export interface ICommunityRepository {
    createCommunity: (data: InsertCommunity) => Promise<SelectCommunity>
    findByUser: (userId: User['id'], limit?: number) => Promise<SelectCommunity[]>
    findById: (communityId: CommunityId) => Promise<SelectCommunity | undefined>
    update: (data: CommunityType, communityId: CommunityId) => Promise<void>
    delete: (communityId: CommunityId) => Promise<void>
}

/**
 * Concrete implementation of the Community Repository using Drizzle ORM.
 * Interacts directly with the Neon database.
 * @implements {ICommunityRepository}
 */
class CommunityRepository implements ICommunityRepository {
    /**
     * Inserts a new community record into the database.
     * * @param {InsertCommunity} data - The payload required to create a community.
     * @returns {Promise<SelectCommunity>} The newly created community record.
     */
    async createCommunity(data: InsertCommunity): Promise<SelectCommunity> {
        return (await db
            .insert(community)
            .values(data)
            .returning()
        )[0]
    }

    /**
     * Retrieves a list of communities created by a specific user.
     *  @param {User['id']} userId - The unique identifier of the user (creator).
     * @param {number} [limit=10] - Maximum number of records to retrieve.
     * @returns {Promise<SelectCommunity[]>} An array of matched communities.
     */
    async findByUser(userId: User['id'], limit: number = 10): Promise<SelectCommunity[]> {
        return await db
            .select()
            .from(community)
            .where(eq(community.createdBy, userId))
            .limit(limit)
    }

    /**
     * Finds a single community by its unique identifier.
     * @param {CommunityId} communityId - The UUID/ID of the community.
     * @returns {Promise<SelectCommunity | undefined>} The community if found, otherwise undefined.
     */
    async findById(communityId: CommunityId): Promise<SelectCommunity | undefined> {
        return (await db
            .select()
            .from(community)
            .where(eq(community.id, communityId))
            .limit(1)
        )[0]
    }

    /**
     * Updates an existing community's details.
     * @param {CommunityType} data - The validated payload containing updated fields.
     * @param {CommunityId} communityId - The ID of the community to update.
     * @returns {Promise<void>}
     */
    async update(data: CommunityType, communityId: CommunityId): Promise<void> {
        await db
            .update(community)
            .set({ ...data })
            .where(eq(community.id, communityId))
    }

    /**
     * Hard deletes a community record from the database.
     * @param {CommunityId} communityId - The ID of the community to delete.
     * @returns {Promise<void>}
     */
    async delete(communityId: CommunityId): Promise<void> {
        await db
            .delete(community)
            .where(eq(community.id, communityId))
    }
}

export const communityRepository = new CommunityRepository()