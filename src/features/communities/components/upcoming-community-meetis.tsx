import { MeetiCard } from "@/features/meetis/components/meeti-card";
import { CommunityId } from "../services/community-repository";
import { communityService } from "../services/community-service";
import { Heading } from "@/shared/components/typography/heading";

export async function UpcomingCommunityMeetis({
    communityId
}: {
    communityId: CommunityId
}) {

    const meetis = await communityService.getUpcomingMeetisByCommuity(communityId)
    console.log(meetis);

    return (
        <>
            <section className="max-w-6xl mx-auto mt-10">
                <Heading level={2}>Próximos meetis de la comunidad</Heading>
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 lg:p-0">
                    {meetis.length ? (
                        meetis.map(meeti => (
                            <MeetiCard key={meeti.id} meeti={meeti} />
                        ))
                    ) : (
                        <p className="text-center py-10  text-lg text-gray-600 col-span-1 lg:col-span-3">No Hay Próximos Meetis en esta comunidad</p>
                    )}
                </div>
            </section>
        </>
    )
}