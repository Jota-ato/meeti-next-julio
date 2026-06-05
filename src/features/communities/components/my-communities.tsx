import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { communityService } from "../services/community-service";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { CommunityItem } from "./community-item";

export async function MyCommunities() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    const communities = await communityService.getUserCommunities(session.user)

    return (
        communities.length ? (
            <ul>
                {communities.map(community => (
                    <CommunityItem key={community.data.id} community={community} />
                ))}
            </ul>
        ) : <p className="text-center mt-10 text-lg">
            No hay communidades aún
            <Button
                asChild
                variant={'link'}
            >
                <Link

                    href={'/dashboard/communities/create'}
                >
                    Comienza creando una
                </Link>
            </Button>
        </p>
    )
}