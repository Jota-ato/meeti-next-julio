"use server"

import { requireAuth } from "@/lib/auth-server";
import { meetiAttendeesService } from "../sevices/meeti-attendees-service";
import { getClientIp } from "@/shared/utils/ip";
import { rateLimit } from "@/lib/limiter";
import { getMinutesDiffFromNow } from "@/shared/utils/date";

export async function toggleAttendanceAction(meetiId: string, canConfirm: boolean) {
    const ip = await getClientIp()
    const { success, reset } = await rateLimit.limit(ip)

    if (!success) return {
        success: false,
        message: `Demasiadas solicitudes, intenta nuevamente en ${getMinutesDiffFromNow(reset)} minutos`,
        newPermissions: {
            canConfirm,
            canCancel: !canConfirm
        }
    }
    
    const { session } = await requireAuth()

    if (!session) return {
        success: false,
        message: 'Inicia sesión para confirmar asistencia',
        newPermissions: {
            canConfirm,
            canCancel: !canConfirm
        }
    }

    const result = await meetiAttendeesService.toggleAtendance(meetiId, session.user)

    if (!result) {
        return {
            success: false,
            message: 'Ocurrió un error',
            newPermissions: {
                canConfirm: canConfirm,
                canCancel: !canConfirm
            }
        }
    }

    return result
}