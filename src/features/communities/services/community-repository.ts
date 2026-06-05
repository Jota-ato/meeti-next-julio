import { db } from "@/db";
import { InsertCommunity, SelectCommunity } from "../types/community.types";
import { community } from "@/db/schema/community";
import { User } from "@/features/auth/types/auth.types";
import { eq } from "drizzle-orm";
import { CommunityType } from "../schemas/comunity-schema";

export interface ICommunityRepository {
    createCommunity: (data: InsertCommunity) => Promise<SelectCommunity>
    findByUser: (userId: User['id'], limit?: number) => Promise<SelectCommunity[]>
    findById: (communityId: SelectCommunity['id']) => Promise<SelectCommunity | undefined>
    update: (data: CommunityType, communityId: SelectCommunity['id']) => Promise<void>
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

    async findById(communityId: SelectCommunity['id']) {
        return (await
            db.
                select()
                .from(community).
                where(eq(community.id, communityId))
                .limit(1)
        )[0]
    }

    async update(data: CommunityType, communityId: SelectCommunity['id']) { 
        await db
            .update(community)
            .set({
                ...data
            })
            .where(eq(community.id, communityId))
    }
}

export const communityRepository = new CommunityRepository()