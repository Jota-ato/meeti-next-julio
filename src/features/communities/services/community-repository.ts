import { db } from "@/db";
import { InsertCommunity, SelectCommunity } from "../types/community.types";
import { community } from "@/db/schema/community";

export interface ICommunityRepository {
    createCommunity: (data: InsertCommunity) => Promise<SelectCommunity>
}

class CommunityRepository implements ICommunityRepository {
    async createCommunity(data: InsertCommunity) {
        return (await db.
            insert(community).
            values(data)
            .returning()
        )[0]
    }
}

export const communityRepository = new CommunityRepository()