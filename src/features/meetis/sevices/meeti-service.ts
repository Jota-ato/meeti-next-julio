import { User } from "@/features/auth/types/auth.types";
import { MeetiType } from "../schemas/meeti-schema";
import { IMeetiRepository, meetiRepository } from "./meeti-respository";
import { communityRepository, ICommunityRepository } from "@/features/communities/services/community-repository";
import { IMembershipRepository, membershipRepository } from "@/features/communities/services/membership-repository";
import { MeetiPolicy } from "../policies/meeti-policy";

class MeetiService {
    constructor(
        private meetiRepository: IMeetiRepository,
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ) { }

    async createMeeti(data: MeetiType, user: User) {
        const community = await this.communityRepository.findById(data.communityId)
        const isMember = await this.membershipRepository.isMember(data.communityId, user.id)

        if (!community || isMember) {
            throw new Error('No tienes permisos')
        }

        await this.meetiRepository.insert({
            ...data,
            createdBy: user.id
        })
    }

    async getUpcomingMeetisByUser(user: User) {
        const upcomingMeetis = await this.meetiRepository.findUpcomingByUserId(user.id)
        const enriched = await Promise.all(upcomingMeetis.map(async (meeti) => {
            return {
                data: meeti,
                attendanceCount: 0,
                context: {
                    isAdmin: MeetiPolicy.isAdmin(user, meeti)
                },
                permissions: {
                    canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
                    canEdit: MeetiPolicy.canEdit(user, meeti),
                    canDelete: MeetiPolicy.canDelete(user, meeti),
                }
            }
        }))
        return enriched
    }
}

export const meetiService = new MeetiService(meetiRepository, membershipRepository, communityRepository)