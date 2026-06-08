import { db } from "@/db";
import { InsertNotification, SelectNotification } from "../types/notification.types";
import { notifications } from "@/db/schema/notifications";
import { User } from "@/features/auth/types/auth.types";
import { and, count, eq } from "drizzle-orm";

export interface INotificationRepository {
    create: (data: InsertNotification) => Promise<SelectNotification>
    getUnreadCount: (userId: User['id']) => Promise<number>
    findByUserId: (userId: User['id']) => Promise<SelectNotification[]>
    delete: (userId: User['id']) => Promise<void>
}

class NotificationRepository implements INotificationRepository {
    async create(data: InsertNotification) {
        return (await db
            .insert(notifications)
            .values(data)
            .returning())[0]
    }

    async getUnreadCount(userId: User['id']) { 
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

    async findByUserId(userId: User['id']) { 
        return await db
            .query
            .notifications
            .findMany({
                where: (notification, { eq, and }) => and(
                    eq(notification.userId, userId),
                    eq(notification.read, false)
                ),
                orderBy: (notification) => notification.createdAt
            })
    }

    async delete(userId: User['id']) { 
        await db
            .update(notifications)
            .set({
                read: true
            })
            .where(eq(notifications.userId, userId))
    }
}

export const notificationRepository = new NotificationRepository()