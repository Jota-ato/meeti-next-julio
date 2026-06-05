import { CommunityFormCard } from "@/features/communities/components/community-form-card";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


const title = 'Crea comunidades'

export const metadata: Metadata = {
    title
}

export default function CreateCommunitiePage() {
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
                <CommunityFormCard />
            </Container>
        </>
    )
}