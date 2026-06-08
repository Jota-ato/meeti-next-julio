import { User } from "@/features/auth/types/auth.types";
import { INotificationRepository, notificationRepository } from "./notification-repository";
import { SelectNotification } from "../types/notification.types";

class NotificationService { 
    constructor(
        private notificationRepository: INotificationRepository
    ) { }

    async getUnreadCount(userId: User['id']): Promise<number> { 
        return this.notificationRepository.getUnreadCount(userId)
    }

    async getUserNotifications(userId: User['id']): Promise<SelectNotification[]> { 
        return await this.notificationRepository.findByUserId(userId)
    }

    async clearNotifications(userId: User['id']): Promise<void> { 
        await this.notificationRepository.delete(userId)
    }
}

export const notificationService = new NotificationService(notificationRepository)