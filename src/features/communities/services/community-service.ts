import { CommunityType } from "../schemas/comunity-schema";
import { communityRepository, ICommunityRepository } from "./community-repository";

class CommunityService { 
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    async createCommunity(data: CommunityType, userId: string) { 
        console.log(data)
    }
}

export const communityService = new CommunityService(communityRepository)