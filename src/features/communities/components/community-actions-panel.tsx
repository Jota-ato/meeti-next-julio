import Link from "next/link";
import { CommunityPermissions } from "../types/community.types";
import { CommunityId } from "../services/community-repository";
import { Button } from "@/shared/components/ui/button";
import { CommunityMembership } from "./community-membership";

export function CommunityActionsPanel({
    permissions,
    communityId
}: {
    permissions: CommunityPermissions
    communityId: CommunityId
}) {
    return (
        <div className="flex justify-end gap-2 flex-col md:flex-row">
            {permissions.canEdit && (
                <Button
                    asChild
                >
                    <Link
                        href={`/dashboard/communities/${communityId}/edit`}
                        target="_blank"
                    >
                        Editar Comunidad
                    </Link>
                </Button>
            )}
            {permissions.canJoin || permissions.canLeave ? (
                <CommunityMembership
                    permissions={permissions}
                    communityId={communityId}
                />
            ) : null
            }
        </div>
    )
}