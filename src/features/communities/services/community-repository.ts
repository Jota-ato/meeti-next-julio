import { InsertCommunity } from "@/db/schema/community";

export interface ICommunityRepository { 
    createCommunity: (data: InsertCommunity) => Promise<void>
}

class CommunityRepository implements ICommunityRepository { 
    async createCommunity(data: InsertCommunity) { 
        
    }
}

export const communityRepository = new CommunityRepository()