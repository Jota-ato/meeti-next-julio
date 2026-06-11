import { meetiService } from "@/features/meetis/sevices/meeti-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
    params
}: {
    params: Promise<{ meetiId: string }>
}): Promise<Metadata> {
    const { meetiId } = await params
    const meeti = await meetiService.getMetiById(meetiId)

    return {
        title: `Asistentes de ${meeti.title}`
    }
}

export default async function AttendeesPage({
    params
}: {
    params: Promise<{ meetiId: string }>
}) {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    const { meetiId } = await params
    const { meeti, attendees } = await meetiService.getMeetiAttendees(meetiId, session.user)

    return (
        <Container>
            <Heading>Asistentes al Meeti: {meeti.title}</Heading>

            <div className="mx-auto max-w-2xl mt-10">
                {attendees.length ? (
                    <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 mt-10 bg-card rounded-xl p-10">
                        {attendees.map(({ user }) => (
                            <li key={user.id}>
                                <p className="font-bold text-lg">{user.name}</p>
                                <p className="text-gray-600 text-sm">{user.email}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-center mt-10 text-lg">No hay asistentes confirmados</p>}
            </div>
        </Container>
    )
}