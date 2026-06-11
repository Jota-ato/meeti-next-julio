import { AttendanceToggleButton } from "@/features/meetis/components/attendance-toggle-button";
import { DynamicMeetiLocation } from "@/features/meetis/components/dinamic-meeti-location";
import { OrganizerCard } from "@/features/meetis/components/organizer-card";
import { meetiService } from "@/features/meetis/sevices/meeti-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { displayDate } from "@/shared/utils/date";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const meeti = await meetiService.getMetiById(id)
    return {
        title: `${meeti.title}`,
        openGraph: {
            title: `Meeti: ${meeti.title}`,
            siteName: 'Meeti',
            images: [
                {
                    url: meeti.image,
                    width: 1000,
                    height: 600,
                    alt: `Imagen del Meeti: ${meeti.title}`
                }
            ],
            locale: 'es_ES',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Meeti: ${meeti.title}`,
            description: 'Únete a este meeti',
            images: [meeti.image]
        }
    }
}

export default async function MeetiPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { session } = await requireAuth()
    const { id } = await params
    const { data: meeti, context, permissions } = await meetiService.getMeetiWithDetails(id, session?.user)

    if (context.isPastMeeti) throw new Error('Meeti no encontrado')

    const {
        community,
        category,
        admin,
        virtual: IsVirtual,
        location,
    } = meeti

    return (
        <>
            <nav className="py-5 border-b border-gray-200 px-5 lg:px-0">
                <div className="max-w-7xl mx-auto flex flex-col gap-3  items-start lg:flex-row lg:justify-between lg:gap-0">
                    <p className=" text-muted-foreground">
                        Categoría:
                        <Link
                            href={`/categories/${category.id}`}
                            className="text-accent-foreground font-bold"
                        >
                            {category.name}
                        </Link>
                    </p>
                    <p className=" text-muted-foreground">
                        Comunidad:
                        <Link
                            href={`/communities/${community.id}`}
                            className="text-accent-foreground font-bold"
                        >
                            {community.name}
                        </Link>
                    </p>
                </div>
            </nav>

            {(permissions && !context.isAdmin)  && (
                <div className="max-w-6xl mx-auto my-10 flex gap-4 justify-end">
                    <AttendanceToggleButton
                        meetiId={meeti.id}
                        permissions={permissions}
                    />
                </div>
            )}

            <Heading className="mt-10">
                {meeti.title}
            </Heading>
            <main className="max-w-6xl w-[90%] mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 p-5 lg:px-0 mt-10">
                <section className="lg:col-span-2">
                    <Image
                        src={meeti.image}
                        alt={`Imagen de Meeti ${meeti.title}`}
                        width={800}
                        height={400}
                        priority
                        className="object-contain"
                    />
                    <p className="mt-5 text-lg">{meeti.details}</p>
                </section>

                <aside className="bg-card rounded-2xl overflow-hidden">
                    {IsVirtual && (
                        <p className="bg-accent m-5 rounded-xl text-center text-accent-foreground py-2 font-bold">
                            Este meeti es Virtual
                        </p>
                    )}

                    {(location && !IsVirtual) && (
                        <DynamicMeetiLocation
                            address={location.address}
                            lat={location.lat}
                            lng={location.lng}
                            placeName={location.placeName}
                        />
                    )}

                    <section className="space-y-5 p-10 ">
                        <Heading level={2}>Información Meeti</Heading>
                        <p className="text-muted-foreground"><span className="text-accent-foreground font-bold">Fecha: </span> {displayDate(meeti.date)}</p>
                        <p className="text-muted-foreground"><span className="text-accent-foreground font-bold">Hora: </span> {meeti.time}</p>

                        <OrganizerCard
                            image={""}
                            organizer={admin}
                        />
                    </section>
                </aside>
            </main>
        </>
    )
}