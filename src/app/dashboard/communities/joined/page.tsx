import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


const title = 'Comunidades a las que te uniste'

export const metadata: Metadata = {
    title
}

export default function JoinedCommunitiesPage() {
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
        </Container>
    )
}