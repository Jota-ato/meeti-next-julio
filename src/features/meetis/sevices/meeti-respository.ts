import { db } from "@/db";
import { FullMeeti, InsertMeeti, SelectMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/db/schema/meeti";
import { User } from "@/features/auth/types/auth.types";
import { desc, eq } from "drizzle-orm";
import { format } from "date-fns";
import { LocationType, MeetiType } from "../schemas/meeti-schema";
import { CommunityId } from "@/features/communities/services/community-repository";

/**
 * Interface defining the data access contract for Meeti entities.
 * Encapsulates persistence operations for creating, updating, and querying Meetis and their locations.
 */
export interface IMeetiRepository {
    insert: (data: InsertMeeti) => Promise<void>
    update: (meetiId: string, data: MeetiType) => Promise<SelectMeeti>
    updateLocation: (meetiId: string, locationData: LocationType) => Promise<void>
    deleteLocation: (meetiId: string) => Promise<void>
    findUpcomingByUserId: (userId: User['id']) => Promise<SelectMeeti[]>
    findUpcoming: () => Promise<SelectMeeti[]>
    findById: (id: string) => Promise<SelectMeeti | null>
    findFullById: (id: string) => Promise<FullMeeti | null>
    findUpcomingByCommunity: (communityId: CommunityId) => Promise<SelectMeeti[]>
    findByCategory: (categoryId: string) => Promise<SelectMeeti[]>
    delete: (meetiId: string) => Promise<void>
}

/**
 * Concrete implementation of the Meeti Repository using Drizzle ORM.
 * @implements {IMeetiRepository}
 */
class MeetiRepository implements IMeetiRepository {
    /**
     * Persists a new Meeti and, when applicable, its physical location.
     * Location data is inserted only when the Meeti is not virtual and location details are provided.
     * @param {InsertMeeti} data - The payload required to create a Meeti.
     * @returns {Promise<void>}
     */
    async insert(data: InsertMeeti): Promise<void> {
        const [insertedMeeti] = await db
            .insert(meeti)
            .values(data)
            .returning()

        if (!data.virtual && data.location) {
            await db
                .insert(meetiLocations)
                .values({
                    ...data.location,
                    meetiId: insertedMeeti.id,
                })
        }
    }

    /**
     * Updates the core fields of an existing Meeti.
     * @param {string} meetiId - The unique identifier of the Meeti to update.
     * @param {MeetiType} data - The validated field values to persist.
     * @returns {Promise<SelectMeeti>} The updated Meeti record.
     */
    async update(meetiId: string, data: MeetiType): Promise<SelectMeeti> {
        return (await db
            .update(meeti)
            .set(data)
            .where(eq(meeti.id, meetiId))
            .returning())[0]
    }

    /**
     * Updates the physical location associated with a Meeti.
     * @param {string} meetiId - The unique identifier of the Meeti whose location will be updated.
     * @param {LocationType} locationData - The validated location field values to persist.
     * @returns {Promise<void>}
     */
    async updateLocation(meetiId: string, locationData: LocationType): Promise<void> {
        await db
            .update(meetiLocations)
            .set(locationData)
            .where(eq(meetiLocations.meetiId, meetiId));
    }

    /**
     * Removes the physical location record associated with a Meeti.
     * @param {string} meetiId - The unique identifier of the Meeti whose location will be deleted.
     * @returns {Promise<void>}
     */
    async deleteLocation(meetiId: string): Promise<void> {
        await db
            .delete(meetiLocations)
            .where(eq(meetiLocations.meetiId, meetiId));
    }

    /**
     * Retrieves upcoming Meetis created by a specific user.
     * Results are limited to Meetis scheduled on or after the current date and ordered by date descending.
     * @param {User['id']} userId - The unique identifier of the Meeti creator.
     * @returns {Promise<SelectMeeti[]>} An array of upcoming Meeti records.
     */
    async findUpcomingByUserId(userId: User['id']): Promise<SelectMeeti[]> {
        const today = format(new Date(), 'yyyy-MM-dd')
        return await db
            .query
            .meeti
            .findMany({
                where: (meeti, { and, eq, gte }) => and(
                    eq(meeti.createdBy, userId),
                    gte(meeti.date, today)
                ),
                orderBy: (meeti) => desc(meeti.date)
            })
    }

    async findUpcoming() {

        const now = new Date()
        const nowDate = now.toISOString().slice(0, 10)
        const nowTime = now.toTimeString().slice(0, 5)

        return await db
            .query
            .meeti
            .findMany({
                where: (meeti, { or, gte, gt, and, eq }) => or(
                    gt(meeti.date, nowDate),
                    and(
                        eq(meeti.date, nowDate),
                        gte(meeti.time, nowTime)
                    )
                ),
                limit: 9,
                orderBy: (meeti, { asc }) => asc(meeti.date)
            })
    }

    /**
     * Retrieves a Meeti by its unique identifier, including its location relation when present.
     * @param {string} id - The unique identifier of the Meeti.
     * @returns {Promise<SelectMeeti | null>} The Meeti record, or `null` if no match is found.
     */
    async findById(id: string): Promise<SelectMeeti | null> {
        const result = await db
            .query
            .meeti
            .findFirst({
                where: (meeti, { eq }) => eq(meeti.id, id),
                with: {
                    location: true
                }
            })

        return result ?? null
    }

    /**
     * Retrieves a Meeti by its unique identifier with all relations required for a full detail view.
     * Includes location, category, community, and administrator data when available.
     * @param {string} id - The unique identifier of the Meeti.
     * @returns {Promise<FullMeeti | null>} The fully populated Meeti record, or `null` if no match is found.
     */
    async findFullById(id: string): Promise<FullMeeti | null> {
        const result = await db
            .query
            .meeti
            .findFirst({
                where: (meeti, { eq }) => eq(meeti.id, id),
                with: {
                    location: true,
                    category: true,
                    community: true,
                    admin: true
                }
            })
        return result ?? null
    }

    /**
     * Retrieves upcoming Meetis belonging to a specific community.
     * Results are limited to Meetis scheduled on or after the current date, include location data,
     * and are ordered by date ascending.
     * @param {CommunityId} communityId - The unique identifier of the community.
     * @returns {Promise<SelectMeeti[]>} An array of upcoming Meeti records for the community.
     */
    async findUpcomingByCommunity(communityId: CommunityId): Promise<SelectMeeti[]> {
        const today = format(new Date(), 'yyyy-MM-dd')
        return db
            .query
            .meeti
            .findMany({
                where: (meeti, { eq, gte, and }) => and(
                    eq(meeti.communityId, communityId),
                    gte(meeti.date, today)
                ),
                with: {
                    location: true
                },
                orderBy: (meeti, { asc }) => asc(meeti.date)
            })
    }

    async findByCategory(categoryId: string) {

        const today = format(new Date(), 'yyyy-MM-dd')

        return await db
            .query
            .meeti
            .findMany({
                where: (meeti, { and, eq, gte }) => and(
                    eq(meeti.categoryId, categoryId),
                    gte(meeti.date, today)
                ),
                orderBy: (meeti, { asc }) => asc(meeti.date),
                limit: 10
            })
    }

    async delete(meetiId: string) {
        await db
            .delete(meeti)
            .where(eq(meeti.id, meetiId))
    }
}

/** Singleton instance of {@link MeetiRepository} for application-wide use. */
export const meetiRepository = new MeetiRepository()
