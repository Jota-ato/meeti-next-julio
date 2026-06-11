import { db } from "@/db";
import { meetiAttendees } from "@/db/schema/meeti";
import { and, count, eq } from "drizzle-orm";
import { SelectMeetiAttendeeWithUser } from "../types/meeti.types";

/**
 * Interface defining the data access contract for Meeti attendee records.
 * Encapsulates persistence operations for registering, removing, and querying attendance.
 */
export interface IMeetiAttendeesRepository {
    isUserAttending: (userId: string, meetiId: string) => Promise<boolean>
    insert: (userId: string, meetiId: string) => Promise<void>
    delete: (userId: string, meetiId: string) => Promise<void>
    findAttendeesCount: (meetiId: string) => Promise<number>
    findAttendeesByMeetiId: (meetiId: string) => Promise<SelectMeetiAttendeeWithUser[]>
}

/**
 * Concrete implementation of the Meeti Attendees Repository using Drizzle ORM.
 * @implements {IMeetiAttendeesRepository}
 */
class MeetiAttendeesRepository implements IMeetiAttendeesRepository {
    /**
     * Determines whether a user is registered as an attendee of a specific Meeti.
     * @param {string} userId - The unique identifier of the user.
     * @param {string} meetiId - The unique identifier of the Meeti.
     * @returns {Promise<boolean>} `true` if an attendance record exists; otherwise, `false`.
     */
    async isUserAttending(userId: string, meetiId: string): Promise<boolean> {
        const result = await db
            .query
            .meetiAttendees
            .findFirst({
                where: (meetiAttendee, { and, eq }) => and(
                    eq(meetiAttendee.userId, userId),
                    eq(meetiAttendee.meetiId, meetiId)
                )
            })
        return !!result
    }

    /**
     * Registers a user as an attendee of a Meeti by inserting an attendance record.
     * @param {string} userId - The unique identifier of the user to register.
     * @param {string} meetiId - The unique identifier of the Meeti.
     * @returns {Promise<void>}
     */
    async insert(userId: string, meetiId: string): Promise<void> {
        await db
            .insert(meetiAttendees)
            .values({
                meetiId,
                userId
            })
    }

    /**
     * Removes a user's attendance record from a Meeti.
     * @param {string} userId - The unique identifier of the user whose attendance will be removed.
     * @param {string} meetiId - The unique identifier of the Meeti.
     * @returns {Promise<void>}
     */
    async delete(userId: string, meetiId: string): Promise<void> {
        await db
            .delete(meetiAttendees)
            .where(and(
                eq(meetiAttendees.userId, userId),
                eq(meetiAttendees.meetiId, meetiId),
            ))
    }

    /**
     * Returns the total number of attendees registered for a Meeti.
     * Uses an SQL `count()` aggregation to avoid loading full rows into application memory.
     * @param {string} meetiId - The unique identifier of the Meeti.
     * @returns {Promise<number>} The total count of attendance records for the Meeti.
     */
    async findAttendeesCount(meetiId: string): Promise<number> {
        return (await db
            .select({ total: count() })
            .from(meetiAttendees)
            .where(eq(meetiAttendees.meetiId, meetiId))
        )[0].total
    }

    /**
     * Retrieves all attendance records for a Meeti, including related user and Meeti entities.
     * @param {string} meetiId - The unique identifier of the Meeti.
     * @returns {Promise<SelectMeetiAttendeeWithUser[]>} An array of attendee records with populated relations.
     */
    async findAttendeesByMeetiId(meetiId: string): Promise<SelectMeetiAttendeeWithUser[]> {
        return await db
            .query
            .meetiAttendees
            .findMany({
                where: (meetiAttendee, { eq }) => eq(meetiAttendee.meetiId, meetiId),
                with: {
                    user: true,
                    meeti: true
                }
            })
    }
}

/** Singleton instance of {@link MeetiAttendeesRepository} for application-wide use. */
export const meetiAttendeesRepository = new MeetiAttendeesRepository()
