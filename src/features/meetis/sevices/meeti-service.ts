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

        if (!community || !isMember) {
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

    async getMetiById(meetiId: string) { 
        const meeti = await this.meetiRepository.findById(meetiId)
        if (!meeti) throw new Error('Meeti no encontrado')

        return meeti
    }

    async getMeetiWithPermissions(meetiId: string, user: User) { 
        const meeti = await this.getMetiById(meetiId)

        return {
            data: meeti,
            context: {
                isAdmin: MeetiPolicy.isAdmin(user, meeti)
            }, 
            permissions: {
                canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
                canEdit: MeetiPolicy.canEdit(user, meeti),
                canDelete: MeetiPolicy.canDelete(user, meeti),
            }
        }
    }

    async updateMeeti(meetiId: string, data: MeetiType, user: User) { 

        const meeti = await this.getMeetiWithPermissions(meetiId, user)

        if (!meeti.permissions.canEdit) { 
            throw new Error('No tienes permisos')
        }

        const updated = await this.meetiRepository.update(meeti.data.id, data)
        if (data.virtual) {
            await this.meetiRepository.deleteLocation(updated.id)
        } else { 
            await this.meetiRepository.updateLocation(updated.id, data.location)
        }

        return updated
    }

    async getMeetiWithDetails(meetiId: string, user?: User) { 
        const meeti = await this.meetiRepository.findFullById(meetiId)

        if (!meeti) throw new Error('Meeti no encontrado')

        return {
            data: meeti,
            context: {

            },
            permissions: {
                
            }
        }
    }
}

export const meetiService = new MeetiService(meetiRepository, membershipRepository, communityRepository)