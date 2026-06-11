import { differenceInMinutes, format, formatDistanceToNow, parseISO } from "date-fns"
import { es } from "date-fns/locale";

export function formatCreatedDate(date: Date) {
    return formatDistanceToNow(date, {
        locale: es,
        addSuffix: true
    })
}

export function formatMeetiDate(date: string, time: string) {
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes, seconds = 0] = time.split(':').map(Number)

    return formatDistanceToNow(new Date(year, month - 1, day, hours, minutes, seconds), {
        addSuffix: true,
        locale: es
    })
}

export function displayDate(date: string) {
    return format(parseISO(date), 'PPPP', { locale: es })
}

export function getMinutesDiffFromNow(timestampMs: number) { 
    return differenceInMinutes(new Date(timestampMs), new Date())
}