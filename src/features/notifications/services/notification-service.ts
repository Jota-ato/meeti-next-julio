import { User } from "@/features/auth/types/auth.types";
import { INotificationRepository, notificationRepository } from "./notification-repository";
import { InsertNotification, SelectNotification } from "../types/notification.types";
import { INotificationPublisher, notificationPusher } from "./notification-pusher";

export interface INotificationService { 
    createAndNotify(data: InsertNotification): Promise<void>
    getUnreadCount(userId: User['id']): Promise<number>
    getUserNotifications(userId: User['id']): Promise<SelectNotification[]>
    clearNotifications(userId: User['id']): Promise<void>
}

/**
 * Service layer responsible for executing Notification business logic.
 * Decouples the notification routing and controllers from direct database access.
 */
class NotificationService implements INotificationService {
    /**
     * Injects the notification repository.
     * @param {INotificationRepository} notificationRepository - Data access layer for notifications.
     */
    constructor(
        private notificationRepository: INotificationRepository,
        private notificationPusher: INotificationPublisher
    ) { }

    async createAndNotify(data: InsertNotification) {
        const notification = await this.notificationRepository.create(data)
        await this.notificationPusher.notify(notification)
    }

    /**
     * Fetches the total count of unread notifications for UI badging (e.g., bell icon).
     * @param {User['id']} userId - The unique identifier of the user.
     * @returns {Promise<number>} The unread count.
     */
    async getUnreadCount(userId: User['id']): Promise<number> {
        return this.notificationRepository.getUnreadCount(userId)
    }

    /**
     * Retrieves the list of unread notifications for a user to display in the UI dropdown or page.
     * @param {User['id']} userId - The unique identifier of the user.
     * @returns {Promise<SelectNotification[]>} Array of notification records.
     */
    async getUserNotifications(userId: User['id']): Promise<SelectNotification[]> {
        return await this.notificationRepository.findByUserId(userId)
    }

    /**
     * Clears a user's notification queue by marking them all as read.
     * @param {User['id']} userId - The unique identifier of the user.
     * @returns {Promise<void>}
     */
    async clearNotifications(userId: User['id']): Promise<void> {
        await this.notificationRepository.markAllAsRead(userId)
    }
}

export const notificationService = new NotificationService(notificationRepository,notificationPusher)