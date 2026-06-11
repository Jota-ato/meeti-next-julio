"use client"

import { Button } from "@/shared/components/ui/button";
import { MeetiPermissions } from "../types/meeti.types";
import { useState } from "react";
import { toggleAttendanceAction } from "../actions/attendance-actions";
import { toast } from "sonner";

export function AttendanceToggleButton({
    permissions,
    meetiId
}: {
    permissions: MeetiPermissions,
    meetiId: string
}) {

    const [canConfirm, setCanConfirm] = useState(permissions.canConfirm)
    const [canCancel, setCanCancel] = useState(permissions.canCancel)

    const handleClick = async () => {

        const response = await toggleAttendanceAction(meetiId, canConfirm)

        if (!response.success) {
            toast.error(response.message)
        } else { 
            toast.success(response.message)
            setCanConfirm(response.newPermissions.canConfirm)
            setCanCancel(response.newPermissions.canCancel)
        }
    }

    return (
        <>
            {canConfirm &&
                <Button
                    onClick={handleClick}
                >
                    Confirmar asistencia
                </Button>
            }
            {canCancel &&
                <Button
                    onClick={handleClick}
                    variant={'destructive'}
                >
                    Cancelar la asistencia
                </Button>
            }
        </>
    )
}