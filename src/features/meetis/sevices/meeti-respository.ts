import { db } from "@/db";
import { InsertMeeti, SelectMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/db/schema/meeti";
import { User } from "@/features/auth/types/auth.types";
import { desc, eq } from "drizzle-orm";
import { format } from "date-fns";
import { LocationType, MeetiType } from "../schemas/meeti-schema";

export interface IMeetiRepository {
    insert: (data: InsertMeeti) => Promise<void>
    update: (meetiId: string, data: MeetiType) => Promise<SelectMeeti>
    updateLocation: (meetiId: string, locationData: LocationType) => Promise<void>
    deleteLocation: (meetiId: string) => Promise<void>
    findUpcomingByUserId: (userId: User['id']) => Promise<SelectMeeti[]>
    findById: (id: string) => Promise<SelectMeeti | null>
}

class MeetiRepository implements IMeetiRepository {
    async insert(data: InsertMeeti) {
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

    async update(meetiId: string, data: MeetiType) {
        return (await db
            .update(meeti)
            .set(data)
            .where(eq(meeti.id, meetiId))
            .returning())[0]
    }

    async updateLocation(meetiId: string, locationData: LocationType) {
        await db
            .update(meetiLocations)
            .set(locationData)
            .where(eq(meetiLocations.meetiId, meetiId));
    }

    async deleteLocation(meetiId: string) {
        await db
            .delete(meetiLocations)
            .where(eq(meetiLocations.meetiId, meetiId));
    }

    async findUpcomingByUserId(userId: User['id']) {
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

    async findById(id: string) {
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
}

export const meetiRepository = new MeetiRepository()