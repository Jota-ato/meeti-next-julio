import { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { MyCommunities } from "@/features/communities/components/my-communities";
import { Separator } from "@/shared/components/ui/separator";

const title = 'Administra tus comunidades'

export const metadata: Metadata = {
    title
}

export default function ComunitiesPage() {
    return (
        <Container>
            <Heading className="text-center">
                {title}
            </Heading>
            <div className="flex justify-between flex-col md:flex-row my-8">
                <Button asChild>
                    <Link
                        href="/dashboard/communities/create"
                    >
                        Crear Comunidad
                    </Link>
                </Button>


                <Button variant={'secondary'} asChild>
                    <Link
                        href="/dashboard/communities/joined"
                    >
                        Comunidades a las que te uniste
                    </Link>
                </Button>
            </div>
            <Separator className="my-8" />
            <MyCommunities />

        </Container>
    )
}