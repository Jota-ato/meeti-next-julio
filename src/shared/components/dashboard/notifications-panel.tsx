import { notificationService } from '@/features/notifications/services/notification-service';
import { requireAuth } from '@/lib/auth-server';
import { BellIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

export async function NotificationsPanel() {

    const { session } = await requireAuth()
    if (!session) return null

    const totalNotifications = await notificationService.getUnreadCount(session.user.id)

    return (
        <div className="absolute top-4 right-4">
            <Link
                href={'/dashboard/notifications'}
                className="relative rounded-full text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
            >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
                {totalNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white p-2">
                        {totalNotifications}
                    </span>
                )}
            </Link>
        </div>
    )
}