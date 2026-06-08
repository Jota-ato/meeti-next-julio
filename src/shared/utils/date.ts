import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale";

export function formatCreatedDate(date: Date) {
    return formatDistanceToNow(date, {
        locale: es,
        addSuffix: true
    })
}