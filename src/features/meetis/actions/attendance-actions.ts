"use server"

import { requireAuth } from "@/lib/auth-server";
import { meetiAttendeesService } from "../sevices/meeti-attendees-service";

export async function toggleAttendanceAction(meetiId: string) {
    const { session } = await requireAuth()

    if (!session) return {
        success: false,
        message: 'Inicia sesión para confirmar asistencia',
        newPermissions: {
            canConfirm: false,
            canCancel: false
        }
    }

    const result = await meetiAttendeesService.toggleAtendance(meetiId, session.user)

    if (!result) {
        return {
            success: false,
            message: 'Ocurrió un error',
            newPermissions: {
                canConfirm: false,
                canCancel: false
            }
        }
    }

    return result
}