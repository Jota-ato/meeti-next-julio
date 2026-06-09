import { db } from "@/db";
import { InsertMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/db/schema/meeti";

export interface IMeetiRepository { 
    insert: (data: InsertMeeti) => Promise<void>
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
}

export const meetiRepository = new MeetiRepository()