import { notificationService } from '@/features/notifications/services/notification-service'
import { requireAuth } from '@/lib/auth-server'
import { NotificationsPanelClient } from './notifications.panel-client';

export async function NotificationsPanel() {

    const { session } = await requireAuth()
    if (!session) return null

    const totalNotifications = await notificationService.getUnreadCount(session.user.id)

    return (
        <div className="absolute top-4 right-4">
            <NotificationsPanelClient
                user={session.user}
                initialNotifications={totalNotifications}
            />
        </div>
    )
}