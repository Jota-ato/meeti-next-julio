import { CommunityType } from "../schemas/comunity-schema";
import { communityRepository, ICommunityRepository } from "./community-repository";

class CommunityService { 
    constructor(
        private communityRepository: ICommunityRepository
    ) {}

    async createCommunity(data: CommunityType, userId: string) { 
        const community = await this.communityRepository.createCommunity({
            ...data,
            createdBy: userId
        })
    }
}

export const communityService = new CommunityService(communityRepository)