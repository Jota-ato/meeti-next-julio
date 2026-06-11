import { User } from "@/features/auth/types/auth.types";
import { IMeetiAttendeesRepository, meetiAttendeesRepository } from "./meeti-attendees-repository";
import { IMeetiRepository, meetiRepository } from "./meeti-respository";
import { MeetiAttendeePolicy } from "../policies/meeti-attendee-policy";
import { INotificationService, notificationService } from "@/features/notifications/services/notification-service";

class MeetiAttendeesService {
    constructor(
        private meetiAttendeesRepository: IMeetiAttendeesRepository,
        private meetiRepository: IMeetiRepository,
        private notificationService: INotificationService
    ) { }

    async toggleAtendance(meetiId: string, user: User) {
        const meeti = await this.meetiRepository.findById(meetiId)

        if (!meeti) throw new Error('Meeti no encontrado')

        const isAttending = await this.meetiAttendeesRepository.isUserAttending(user.id, meeti.id)

        if (MeetiAttendeePolicy.canConfirm(user, meeti, isAttending)) {
            await this.meetiAttendeesRepository.insert(user.id, meeti.id)
            await this.notificationService.createAndNotify({
                actorName: user.name,
                message: `${user.name} confirmó su asistencia al meeti ${meeti.title}`,
                target: meeti.createdBy,
                userId: user.id
            })
            return {
                success: true,
                message: `Confirmaste tu asistencia a ${meeti.title}`,
                newPermissions: {
                    canConfirm: false,
                    canCancel: true
                }
            }
        }

        if (MeetiAttendeePolicy.canCancel(user, meeti, isAttending)) {
            await this.meetiAttendeesRepository.delete(user.id, meeti.id)
            await this.notificationService.createAndNotify({
                actorName: user.name,
                message: `${user.name} canceló su asistencia al meeti ${meeti.title}`,
                target: meeti.createdBy,
                userId: user.id
            })
            return {
                success: true,
                message: `Cancelaste tu tu asistencia a ${meeti.title}`,
                newPermissions: {
                    canConfirm: true,
                    canCancel: false
                }
            }
        }


    }
}

export const meetiAttendeesService = new MeetiAttendeesService(
    meetiAttendeesRepository,
    meetiRepository,
    notificationService
)