import { communityService } from "@/features/communities/services/community-service";
import { MeetiForm } from "@/features/meetis/components/meeti-form";
import { categoryService } from "@/features/meetis/sevices/category-service";
import { meetiService } from "@/features/meetis/sevices/meeti-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
    params
}: {
    params: Promise<{ meetiId: string }>
}): Promise<Metadata> { 
    const { meetiId } = await params
    const meeti = await meetiService.getMetiById(meetiId)

    return {
        title: `Editar ${meeti.title}`
    }
}

export default async function EditMeetiPage({
    params
}: {
    params: Promise<{ meetiId: string }>
}) {
    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')
    const { meetiId } = await params

    const meeti = await meetiService.getMeetiWithPermissions(meetiId, session.user)
    if (!meeti.context.isAdmin) throw new Error('No autorizado')

    const communities = await communityService.getUserCommunitiesForMeeti(session.user.id)
    const categories = await categoryService.getAllCategories()

    return (
        <Container>
            <Heading>Editar Meeti: {meeti.data.title}</Heading>

            <Button className="mt-8" variant={'link'}>
                <Link
                    href="/dashboard/meetis"
                    className="flex items-center gap-2"
                >
                    <ChevronLeft />
                    Volver a mis meetis
                </Link>
            </Button>

            <MeetiForm
                communities={communities}
                categories={categories}
                meeti={meeti.data}
            />
        </Container>
    )
}