import { NotificationList } from "@/features/notifications/components/notification-list";
import { notificationService } from "@/features/notifications/services/notification-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = 'Tus notificaciones'

export const metadata: Metadata = {
    title
}

export default async function NotificationsPage() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    const notifications = await notificationService.getUserNotifications(session.user.id)
    await notificationService.clearNotifications(session.user.id)
    return (
        <>
            <Heading>{title}</Heading>
            <NotificationList notifications={notifications} />
        </>
    )
}