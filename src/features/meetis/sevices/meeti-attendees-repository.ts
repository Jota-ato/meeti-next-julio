import { db } from "@/db";
import { meetiAttendees } from "@/db/schema/meeti";
import { and, count, eq } from "drizzle-orm";
import { SelectMeetiAttendeeWithUser } from "../types/meeti.types";
import { CommunityId } from "@/features/communities/services/community-repository";

export interface IMeetiAttendeesRepository { 
    isUserAttending: (userId: string, meetiId: string) => Promise<boolean>
    insert: (userId: string, meetiId: string) => Promise<void>
    delete: (userId: string, meetiId: string) => Promise<void>
    findAttendeesCount: (meetiId: string) => Promise<number>
    findAttendeesByMeetiId: (meetiId: string) => Promise<SelectMeetiAttendeeWithUser[]>
    findAttendeesByCommunity: (communityId: CommunityId) => Promise<void>
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository { 
    async isUserAttending(userId: string, meetiId: string) { 
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

    async insert(userId: string, meetiId: string) { 
        await db
            .insert(meetiAttendees)
            .values({
                meetiId,
                userId
            })
    }

    async delete(userId: string, meetiId: string) { 
        await db
            .delete(meetiAttendees)
            .where(and(
                eq(meetiAttendees.userId, userId),
                eq(meetiAttendees.meetiId, meetiId),
            ))
    }

    async findAttendeesCount(meetiId: string) { 
        return (await db
            .select({ total: count() })
            .from(meetiAttendees)
            .where(eq(meetiAttendees.meetiId, meetiId))
        )[0].total
    }

    async findAttendeesByMeetiId(meetiId: string) { 
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

    async findAttendeesByCommunity(communityId: CommunityId) { 
        
    }
}

export const meetiAttendeesRepository = new MeetiAttendeesRepository()