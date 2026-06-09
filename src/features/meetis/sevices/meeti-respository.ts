import { db } from "@/db";
import { InsertMeeti, SelectMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/db/schema/meeti";
import { User } from "@/features/auth/types/auth.types";
import { desc, eq } from "drizzle-orm";
import { format } from "date-fns";

export interface IMeetiRepository {
    insert: (data: InsertMeeti) => Promise<void>
    findUpcomingByUserId: (userId: User['id']) => Promise<SelectMeeti[]>
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
}

export const meetiRepository = new MeetiRepository()