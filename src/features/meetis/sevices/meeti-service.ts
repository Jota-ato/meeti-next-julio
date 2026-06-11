import { User } from "@/features/auth/types/auth.types";
import { MeetiType } from "../schemas/meeti-schema";
import { IMeetiRepository, meetiRepository } from "./meeti-respository";
import { communityRepository, ICommunityRepository } from "@/features/communities/services/community-repository";
import { IMembershipRepository, membershipRepository } from "@/features/communities/services/membership-repository";
import { MeetiPolicy } from "../policies/meeti-policy";
import { IMeetiAttendeesRepository, meetiAttendeesRepository } from "./meeti-attendees-repository";
import { MeetiAttendeePolicy } from "../policies/meeti-attendee-policy";

class MeetiService {
    constructor(
        private meetiRepository: IMeetiRepository,
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository,
        private meetiAttendeesRepository: IMeetiAttendeesRepository
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
                attendanceCount: await this.meetiAttendeesRepository.findAttendeesCount(meeti.id),
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
        const isPastMeeti = MeetiPolicy.isPastMeeti(meeti)

        if (!user) return {
            data: meeti,
            context: {
                isAdmin: false,
                isPastMeeti,
                isAttending: false
            },
            permissions: {
                canConfirm: false,
                canCancel: false
            }
        }

        const isAttending = await this.meetiAttendeesRepository.isUserAttending(user.id, meetiId)
        return {
            data: meeti,
            context: {
                isAdmin: MeetiPolicy.isAdmin(user, meeti),
                isPastMeeti,
                isAttending
            },
            permissions: {
                canConfirm: MeetiAttendeePolicy.canConfirm(user, meeti, isAttending),
                canCancel: MeetiAttendeePolicy.canCancel(user, meeti, isAttending),
            }
        }
    }

    async getMeetiAttendees(meetiId: string, user: User) {
        const meeti = await this.getMetiById(meetiId)

        if (!MeetiPolicy.canViewAttendes(user, meeti)) {
            throw new Error('No autorizado')
        }

        const attendees = await this.meetiAttendeesRepository.findAttendeesByMeetiId(meeti.id)
        return {
            meeti: meeti,
            attendees
        }
    }

    async getUpcoming() { 
        return await this.meetiRepository.findUpcoming()
    }
}

export const meetiService = new MeetiService(
    meetiRepository,
    membershipRepository,
    communityRepository,
    meetiAttendeesRepository
)