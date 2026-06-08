import { CreateMeeti } from "@/features/meetis/components/create-meeti";
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

export default function CreateMeetiPage() {
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
                    <CreateMeeti />
                </CardContent>
            </Card>
        </Container>
    )
}