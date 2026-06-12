"use client"

import { revokeSession } from "@/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function RevokeSessionButton({
    token
}: {
    token: string
}) {

    return (
        <Button
            variant={'destructive'}
            onClick={async () => {
                await revokeSession({
                    token
                })
                toast.success('Se cerró la sesión correctamente')
                redirect('/dashboard/security')
            }}
        >
            Cerrar session
        </Button>
    )
}