import { User } from "@/features/auth/types/auth.types";
import { CommunityType } from "../schemas/comunity-schema";
import { communityRepository, ICommunityRepository } from "./community-repository";
import { CommunityPolicy } from "../policies/community-policy";
import { MembershipPolicy } from "../policies/membership-policy";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    async createCommunity(data: CommunityType, userId: string) {
        await this.communityRepository.createCommunity({
            ...data,
            createdBy: userId
        })
    }

    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id)

        const enriched = await Promise.all(communities.map(async (community) => {
            const isMember = true
            return {
                data: community,
                context: {
                    isMember,
                    isAdmin: CommunityPolicy.isAdmin(user, community)
                },
                permissions: {
                    canEdit: CommunityPolicy.canEdit(user, community),
                    canDelete: CommunityPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }
        }))
        return enriched
    }
}

export const communityService = new CommunityService(communityRepository)