import { CommunityItem } from "@/features/communities/components/community-item";
import { membershipService } from "@/features/communities/services/membership-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";


const title = 'Comunidades a las que te uniste'

export const metadata: Metadata = {
    title
}

export default async function JoinedCommunitiesPage() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    const communities = await membershipService.getJoinedCommunities(session.user)

    return (
        <Container>
            <Heading>
                {title}
            </Heading>
            <Button className="mt-8" variant={'link'}>
                <Link
                    href="/dashboard/communities"
                    className="flex items-center gap-2"
                >
                    <ChevronLeft />
                    Volver a mis Comunidades
                </Link>
            </Button>
            <Separator className="my-8" />
            {
                communities.length ? (
                    <ul role="list" className="divide-y divide-gray-100 mt-10 shadow-lg p-10">
                        {communities.map(community => (
                            <CommunityItem
                                key={community.data.id}
                                community={community}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="text-center mt-10 text-lg">
                        No hay communidades aún
                        <Button
                            asChild
                            variant={'link'}
                        >
                            <Link

                                href={'/dashboard/communities/create'}
                            >
                                Entrando a una
                            </Link>
                        </Button>
                    </p>
                )
            }
        </Container>
    )
}