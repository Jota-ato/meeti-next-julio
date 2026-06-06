import { ActionResponse, User } from "@/features/auth/types/auth.types";
import { CommunityId, communityRepository, ICommunityRepository } from "./community-repository";
import { IMembershipRepository, membershipRepository } from "./membership-repository";
import { notFound } from "next/navigation";
import { MembershipPolicy } from "../policies/membership-policy";

class MembershipService {

    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ) { }

    async toggleMembership(communityId: CommunityId, user: User): ActionResponse {
        const community = await this.communityRepository.findById(communityId)
        if (!community) { 
            return {
                success: false,
                message: 'Ocurrió un error'
            }
        }

        const isMember = await this.membershipRepository.isMember(communityId, user.id)

        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id)
            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`
            }
        }

        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(communityId, user.id)
            return {
                success: true,
                message: `Haz salido a la comunidad ${community.name}`
            }
        }

        return {
            success: false,
            message: 'Ocurró un error'
        }
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository)