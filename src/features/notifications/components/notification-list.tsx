import { formatCreatedDate } from "@/shared/utils/date";
import { SelectNotification } from "../types/notification.types";

export function NotificationList({
    notifications
}: {
    notifications: SelectNotification[]
}) {
    return (
        <div className="mt-10 space-y-4 px-8">
            {notifications.length ? (
                notifications.map(notification => (
                    <div
                        key={notification.id}
                        className="p-4 rounded-xl shadow-shadow shadow-xs bg-card max-w-3xl mx-auto"
                    >
                        <p>
                            {notification.actorName} - {notification.message}
                            <span className="font-bold">{' '}{notification.target}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatCreatedDate(notification.createdAt)}
                        </p>
                    </div>
                ))
            ): (
                <p className="text-center mt-10 text-lg text-muted-foreground">No hay notificaciones</p>
            )}
        </div>
    )
}