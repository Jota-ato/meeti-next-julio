import { db } from "@/db";
import { InsertCommunity, SelectCommunity } from "../types/community.types";
import { community } from "@/db/schema/community";
import { User } from "@/features/auth/types/auth.types";
import { eq } from "drizzle-orm";

export interface ICommunityRepository {
    createCommunity: (data: InsertCommunity) => Promise<SelectCommunity>
    findByUser: (userId: User['id'], limit?: number) => Promise<SelectCommunity[]>
}

class CommunityRepository implements ICommunityRepository {
    async createCommunity(data: InsertCommunity) {
        return (await db.
            insert(community).
            values(data)
            .returning()
        )[0]
    }

    async findByUser(userId: User['id'], limit: number = 10) { 
        return await
            db.
            select()
            .from(community)
                .where(eq(community.createdBy, userId))
            .limit(limit)
    }
}

export const communityRepository = new CommunityRepository()