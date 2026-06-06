"use client"

import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { CommunityPermissions } from "../types/community.types";
import { CommunityId } from "../services/community-repository";
import { toggleMembershipAction } from "../actions/membership-actions";
import { toast } from "sonner";

export function CommunityMembership({
    permissions,
    communityId
}: {
    permissions: CommunityPermissions
    communityId: CommunityId
}) {

    const [canJoin, setCanJoin] = useState(permissions.canJoin)
    const [canLeave, setCanLeave] = useState(permissions.canLeave)

    const handleClick = async () => {
        const result = await toggleMembershipAction(communityId)

        if (result.success) {
            toast.success(result.message)
            setCanJoin(prev => result.newPermissions?.canJoin ?? prev)
            setCanLeave(prev => result.newPermissions?.canLeave ?? prev)
        }
        else toast.error(result.message) 
    }

    return (
        <>
            {canJoin &&
                <Button
                    onClick={handleClick}
                >
                    Inscribirme a esta comunidad
                </Button>
            }
            {canLeave &&
                <Button
                    onClick={handleClick}
                    variant={'destructive'}
                >
                    Abandonar comunidad
                </Button>
            }
        </>
    )
}