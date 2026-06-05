import { CommunityFormCard } from "@/features/communities/components/community-form-card";
import { communityService } from "@/features/communities/services/community-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";


const title = 'Editar communidad'

export const metadata: Metadata = {
    title
}

export default async function EditCommunityPage(props: PageProps<'/dashboard/communities/[communitieId]/edit'>) {

    const { communitieId } = await props.params
    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    const community = await communityService.getCommunityDetails(communitieId, session.user)

    if (!community.permissions.canEdit) notFound()

    return (
        <>
            <Heading>
                {title}
            </Heading>
            <Container>
                <Button className="mt-8" variant={'link'}>
                    <Link
                        href="/dashboard/communities"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft />
                        Volver a mis Comunidades
                    </Link>
                </Button>
            </Container>
            <Container className="my-12">
                <CommunityFormCard
                    community={community.data}
                />
            </Container>
        </>
    )
}