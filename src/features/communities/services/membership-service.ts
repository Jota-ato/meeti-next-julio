import { User } from "@/features/auth/types/auth.types";
import { CommunityId, communityRepository, ICommunityRepository } from "./community-repository";
import { IMembershipRepository, membershipRepository } from "./membership-repository";
import { MembershipPolicy } from "../policies/membership-policy";

class MembershipService {

    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ) { }

    async toggleMembership(communityId: CommunityId, user: User) {
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
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true
                }
            }
        }

        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(communityId, user.id)
            return {
                success: true,
                message: `Haz salido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: true,
                    canLeave: false
                }
            }
        }

        return {
            success: false,
            message: 'Ocurró un error'
        }
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository)