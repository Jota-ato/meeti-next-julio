import { db } from "@/db";
import { InsertNotification, SelectNotification } from "../types/notification.types";
import { notifications } from "@/db/schema/notifications";
import { User } from "@/features/auth/types/auth.types";
// Importamos 'desc' para corregir el ordenamiento de las notificaciones
import { and, count, eq, desc } from "drizzle-orm";

/**
 * Interface defining the data access contract for Notifications.
 */
export interface INotificationRepository {
    create: (data: InsertNotification) => Promise<SelectNotification>
    getUnreadCount: (userId: User['id']) => Promise<number>
    findByUserId: (userId: User['id']) => Promise<SelectNotification[]>
    markAllAsRead: (userId: User['id']) => Promise<void>
}

/**
 * Concrete implementation of the Notification Repository using Drizzle ORM.
 * @implements {INotificationRepository}
 */
class NotificationRepository implements INotificationRepository {
    /**
     * Inserts a new notification into the database.
     * @param {InsertNotification} data - The payload required to create a notification.
     * @returns {Promise<SelectNotification>} The newly created notification record.
     */
    async create(data: InsertNotification): Promise<SelectNotification> {
        return (await db
            .insert(notifications)
            .values(data)
            .returning())[0]
    }

    /**
     * Aggregates the total number of unread notifications for a specific user.
     * Highly optimized: Uses SQL `count()` to avoid loading full rows into Node.js memory.
     * @param {User['id']} userId - The ID of the user.
     * @returns {Promise<number>} The total count of unread notifications.
     */
    async getUnreadCount(userId: User['id']): Promise<number> {
        const [result] = await db
            .select({ count: count() })
            .from(notifications)
            .where(
                and(
                    eq(notifications.userId, userId),
                    eq(notifications.read, false)
                )
            )
        return result.count
    }

    /**
     * Retrieves all unread notifications for a specific user.
     * Results are ordered by creation date in descending order (newest first).
     * @param {User['id']} userId - The ID of the user.
     * @returns {Promise<SelectNotification[]>} An array of unread notification objects.
     */
    async findByUserId(userId: User['id']): Promise<SelectNotification[]> {
        return await db
            .query
            .notifications
            .findMany({
                where: (notification, { eq, and }) => and(
                    eq(notification.userId, userId),
                    eq(notification.read, false)
                ),
                orderBy: (notification) => desc(notification.createdAt)
            })
    }

    /**
     * Updates all notifications for a specific user, marking them as read.
     * * @param {User['id']} userId - The ID of the user whose notifications will be updated.
     * @returns {Promise<void>}
     */
    async markAllAsRead(userId: User['id']): Promise<void> {
        await db
            .update(notifications)
            .set({
                read: true
            })
            .where(eq(notifications.userId, userId))
    }
}

export const notificationRepository = new NotificationRepository()