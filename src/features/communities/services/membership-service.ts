import { User } from "@/features/auth/types/auth.types";
import { CommunityId, communityRepository, ICommunityRepository } from "./community-repository";
import { IMembershipRepository, membershipRepository } from "./membership-repository";
import { MembershipPolicy } from "../policies/membership-policy";
import { CommunityPolicy } from "../policies/community-policy";

/**
 * Service layer responsible for business logic related to community memberships.
 * Orchestrates cross-repository interactions and enforces access control policies.
 */
class MembershipService {
    /**
     * Injects dependencies for membership and community data access.
     * @param {IMembershipRepository} membershipRepository - Repository handling membership relations.
     * @param {ICommunityRepository} communityRepository - Repository handling community entities.
     */
    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ) { }

    /**
     * Toggles a user's membership status in a community (joins if not a member, leaves if they are).
     * This method utilizes a predictable result pattern suitable for Next.js Server Actions.
     * * @param {CommunityId} communityId - The ID of the target community.
     * @param {User} user - The user attempting to toggle their membership.
     * @returns {Promise<{success: boolean, message: string, newPermissions?: {canJoin: boolean, canLeave: boolean}}>} 
     * A result object containing the operation outcome and the updated optimistic permissions.
     */
    async toggleMembership(communityId: CommunityId, user: User) {
        const community = await this.communityRepository.findById(communityId)
        if (!community) {
            return {
                success: false,
                message: 'Ocurrió un error' // Community not found
            }
        }

        const isMember = await this.membershipRepository.isMember(communityId, user.id)

        // Handle Joining Logic
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

        // Handle Leaving Logic
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

        // Fallback for unauthorized or conflicting state
        return {
            success: false,
            message: 'Ocurrió un error'
        }
    }

    async getJoinedCommunities(user: User) {
        const joined = await this.membershipRepository.findJoinedCommunities(user.id)

        const enriched = await Promise.all(joined.map(async ({community, user}) => {
            
            const isMember = await this.membershipRepository.isMember(community.id, user.id)
            const memberCount = await this.membershipRepository.getMemberCount(community.id)

            return {
                data: community,
                memberCount,
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

export const membershipService = new MembershipService(membershipRepository, communityRepository)