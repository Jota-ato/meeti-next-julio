"use client"
import Link from "next/link";
import { BellIcon } from "lucide-react";
import { User } from "@/features/auth/types/auth.types";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export function NotificationsPanelClient({
    initialNotifications,
    user
}: {
    initialNotifications: number,
    user: User
}) {

    const unreadNotifications = initialNotifications
    const [totalNotifications, setTotalNotifications] = useState(unreadNotifications)

    useEffect(() => {
        const id = `notifications-channel-${user.id}`

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        })

        const channel = pusher.subscribe(id)
        channel.bind('new-notification', () => {
            setTotalNotifications(prev => prev + 1)
        })

        return () => { 
            channel.unbind_all()
            channel.unsubscribe()
        }

    }, [user.id])


    return (
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
    )
}