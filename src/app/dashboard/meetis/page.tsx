import { meetiService } from "@/features/meetis/sevices/meeti-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import { formatMeetiDate } from "@/shared/utils/date";
import { pluralize } from "@/shared/utils/string";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MeetiDropdownMenu } from "@/features/meetis/components/meeti-dropdown-menu"

const title = 'Administra tus Meetis'

export const metadata: Metadata = {
    title
}

export default async function MeetisPage() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    const meetis = await meetiService.getUpcomingMeetisByUser(session.user)

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

            <Separator className="my-8" />

            {meetis.length ? (
                <ul role="list">

                    {meetis.map(meeti => {

                        const { title, image, date, time } = meeti.data

                        return (
                            <li
                                key={meeti.data.id}
                                className="flex justify-between gap-x-6 py-5"
                            >
                                <Card className="flex sm:flex-row items-center w-full gap-x-4 p-0">
                                    <div className="h-full min-w-40 w-full sm:w-auto">
                                        <Image
                                            src={image}
                                            width={400}
                                            height={250}
                                            alt={`imagen de ${title}`}
                                            className="w-full sm:w-60 h-40 object-cover"
                                            priority
                                        />
                                    </div>
                                    <CardHeader className="min-w-0 w-full flex-auto">
                                        <a className="hover:underline font-bold text-lg">
                                            {title}
                                        </a>
                                        <p className="text-muted-foreground text-sm">
                                            {formatMeetiDate(date, time)}
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            {meeti.attendanceCount} {pluralize('Asistente', meeti.attendanceCount)}
                                        </p>
                                    </CardHeader>
                                </Card>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <MeetiDropdownMenu meeti={meeti.data} />
                                </div>
                            </li>
                        )
                    })}

                </ul>
            ) : (
                <p className="text-center mt-10 text-lg">No Hay Meetis Aún. {' '}
                    <Link
                        href={'/dashboard/meetis/create'}
                        className="text-orange-500 font-bold"
                    >Comienza Creando Uno </Link>
                </p >
            )
            }

        </Container >
    )
}