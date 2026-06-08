import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/ui/container";
import { Metadata } from "next";
import Link from "next/link";

const title = 'Administra tus Meetis'

export const metadata: Metadata = {
    title
}

export default function MeetisPage() {
    return (
        <Container>
            <Heading>{title}</Heading>
            <Button asChild>
                <Link
                    href="/dashboard/meetis/create"
                >
                    Crear Meeti
                </Link>
            </Button>
        </Container>
    )
}