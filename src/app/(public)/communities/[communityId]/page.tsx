import { CommunityActionsPanel } from "@/features/communities/components/community-actions-panel";
import { UpcomingCommunityMeetis } from "@/features/communities/components/upcoming-community-meetis";
import { communityService } from "@/features/communities/services/community-service";
import { getServerSession } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { pluralize } from "@/shared/utils/string";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params } : PageProps<'/communities/[communityId]'>): Promise<Metadata> {
    const { communityId } = await params
    const community = await communityService.getCommunity(communityId) 

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
    const session = await getServerSession()

    const community = await communityService.getCommunityDetails(communityId, session?.user)

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
                    </div>
                </div>
            </main>
            <div>
                {/* Próximos Meetis Aquí */}
                <UpcomingCommunityMeetis communityId={communityId} />
            </div>
        </Container>
    )
}