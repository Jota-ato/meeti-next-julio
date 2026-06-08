import { communityService } from "@/features/communities/services/community-service";
import { requireAuth } from "@/lib/auth-server";

export async function GET() {
    const { session } = await requireAuth()
    if (!session) return new Response(JSON.stringify([]))

    const communities = await communityService.getUserCommunitiesForAPI(session.user.id)
    return new Response(JSON.stringify(communities), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
}