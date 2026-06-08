"use client"

import { formatCreatedDate } from "@/shared/utils/date";
import { SelectNotification } from "../types/notification.types";
import { useEffect, useState } from "react";
import { User } from "@/features/auth/types/auth.types";
import Pusher from "pusher-js";

export function NotificationList({
    notifications,
    user
}: {
    notifications: SelectNotification[],
    user: User
}) {

    const [unreadNotifications, setUnreadNotifications] = useState(notifications)

        useEffect(() => {
        const id = `notifications-channel-${user.id}`

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        })

        const channel = pusher.subscribe(id)
        channel.bind('new-notification', (data: SelectNotification) => {
            setUnreadNotifications(prev => [data, ...prev])
        })

        return () => { 
            channel.unbind_all()
            channel.unsubscribe()
        }

    }, [user.id])

    return (
        <div className="mt-10 space-y-4 px-8">
            {unreadNotifications.length ? (
                unreadNotifications.map(notification => (
                    <div
                        key={notification.id}
                        className="p-4 rounded-xl shadow-shadow shadow-xs bg-card max-w-3xl mx-auto"
                    >
                        <p>
                            {notification.actorName} - {notification.message}
                            <span className="font-bold text-accent-foreground">{' '}{notification.target}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatCreatedDate(notification.createdAt)}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center mt-10 text-lg text-muted-foreground">No hay notificaciones</p>
            )}
        </div>
    )
}