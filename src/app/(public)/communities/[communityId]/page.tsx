import { CommunityActionsPanel } from "@/features/communities/components/community-actions-panel";
import { UpcomingCommunityMeetis } from "@/features/communities/components/upcoming-community-meetis";
import { communityService } from "@/features/communities/services/community-service";
import { OrganizerCard } from "@/features/meetis/components/organizer-card";
import { getServerSession } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { pluralize } from "@/shared/utils/string";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react"

const getCachedCommunity = cache(async (communityId: string) => {
    const session = await getServerSession()
    return await communityService.getCommunityDetails(communityId, session?.user)
})

export async function generateMetadata({ params }: PageProps<'/communities/[communityId]'>): Promise<Metadata> {
    const { communityId } = await params
    const { data: community } = await getCachedCommunity(communityId)

    return {
        title: community.name,
        description: community.description,
    }
}

export default async function PublicCommuntyPage({
    params
}:
    PageProps<'/communities/[communityId]'>
) {

    const { communityId } = await params

    const community = await getCachedCommunity(communityId)

    return (
        <Container className="py-12 md:py-16">
            <Heading>
                {community.data.name}
            </Heading>
            <main className="lg:p-0 mt-10">

                {community.permissions && (
                    <CommunityActionsPanel
                        permissions={community.permissions}
                        communityId={community.data.id}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-10">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full">
                            <Image
                                src={community.data.image}
                                alt={`Imagen de la Comunidad ${community.data.name}`}
                                width={600}
                                height={600}
                                className="object-cover size-64"
                                priority
                            />
                        </div>
                        <Heading level={2} className="text-center">
                            {community.data.name}
                        </Heading>
                        <p className="text-muted-foreground text-center">
                            {community.data.description}
                        </p>
                        <p className="text-muted-foreground text-center">
                            {community.memberCount} {pluralize('Miebro', community.memberCount)}
                        </p>
                    </div>
                    <div className="bg-card p-5 rounded-2xl">
                        {/* Admin Aquí */}
                        <OrganizerCard
                            organizer={community.data.admin}
                        />
                    </div>
                </div>
            </main>
            <div>
                <UpcomingCommunityMeetis communityId={communityId} />
            </div>
        </Container>
    )
}