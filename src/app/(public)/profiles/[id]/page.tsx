import { CommunityCard } from "@/features/communities/components/community-card";
import { MeetiCard } from "@/features/meetis/components/meeti-card";
import { profileService } from "@/features/profile/services/profile-service";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react"

const getProfileDetailsCached = cache(async (id: string) => {
    return await profileService.getProfileDetails(id)
})

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const profile = await getProfileDetailsCached(id)

    return {
        title: `Perfil de: ${profile?.name}`,
        openGraph: {
            title: `Meeti: ${profile?.name}`,
            siteName: 'Meeti',
            images: [
                {
                    url: profile?.image ? profile.image : `${process.env.APP_URL}/img/deafult.jpg`,
                    width: 1000,
                    height: 600,
                    alt: `Imagen del perfil: ${profile?.name}`
                }
            ],
            locale: 'es_ES',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: `Perfil: ${profile?.name}`,
            description: 'Te invito a que veas mi perfil',
            images: [profile?.image ? profile.image : `${process.env.APP_URL}/img/deafult.jpg`]
        }
    }
}

export default async function ProfilePage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params
    const profile = await getProfileDetailsCached(id)
    if (!profile) notFound()

    return (
        <Container className="pb-10">
            <main className="mt-10 space-y-5 px-5 lg:p-0 ">
                <div className="space-y-7 mt-10">
                    <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full border border-gray-400">
                        <Image
                            src={profile?.image ? profile.image : '/img/default.jpg'}
                            alt="Imagen Perfil"
                            className="object-cover size-64"
                            priority
                            width={400}
                            height={400}
                        />
                    </div>

                    <Heading>{profile.name}</Heading>
                    <p className="text-muted-foreground text-center text-lg">{profile.bio}</p>
                </div>
            </main>

            {profile.communities.length && (
                <section className="mt-10 space-y-5 px-5 lg:p-0 ">
                    <Heading level={2}>Comunidades de {profile.name}</Heading>
                    <Separator className="my-10" />
                    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
                        {profile.communities.map(community => (
                            <CommunityCard key={community.id} community={community} />
                        ))}
                    </div>
                </section>
            )}
            {profile.meeties.length && (
                <section className="mt-10 space-y-5 px-5 lg:p-0 ">
                    <Heading level={2}>Próximos Meetis de {profile.name}</Heading>
                    <Separator className="my-10" />
                    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
                        {profile.meeties.map(meeti => (
                            <MeetiCard key={meeti.id} meeti={meeti} />
                        ))}
                    </div>
                </section>
            )}
        </Container>
    )
}