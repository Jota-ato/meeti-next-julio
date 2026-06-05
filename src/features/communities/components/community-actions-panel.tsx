import Link from "next/link";
import { CommunityPermissions } from "../types/community.types";
import { CommunityId } from "../services/community-repository";
import { Button } from "@/shared/components/ui/button";

export function CommunityActionsPanel({
    permissions,
    communityId
}: {
    permissions: CommunityPermissions
    communityId: CommunityId
}) {
    return (
        <div className="flex justify-end">
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
        </div>
    )
}