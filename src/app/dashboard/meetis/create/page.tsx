import { communityService } from "@/features/communities/services/community-service";
import { MeetiForm } from "@/features/meetis/components/meeti-form";
import { categoryService } from "@/features/meetis/sevices/category-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const title = 'Crear Meeti'

export const metadata: Metadata = {
    title
}

export default async function CreateMeetiPage() {

    const { session } = await requireAuth()
    if (!session) return new Response(JSON.stringify([]))

    const communities = await communityService.getUserCommunitiesForMeeti(session.user.id)
    const categories = await categoryService.getAllCategories()

    return (
        <Container>
            <Heading>{title}</Heading>
            <Button className="mt-8" variant={'link'}>
                <Link
                    href="/dashboard/meetis"
                    className="flex items-center gap-2"
                >
                    <ChevronLeft />
                    Volver a mis meetis
                </Link>
            </Button>

            <Card className="mt-8">
                <CardContent>
                    <MeetiForm categories={categories} communities={communities} />
                </CardContent>
            </Card>
        </Container>
    )
}