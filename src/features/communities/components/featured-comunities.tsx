import { Container } from "@/shared/components/ui/container";
import { Heading } from "@/shared/components/typography/heading";
import { Separator } from "@/shared/components/ui/separator";
import { CommunityCard } from "./community-card";
import { communityService } from "../services/community-service";

export async function FeatuedCommunities() {

    const communities = await communityService.getFeaturedCommunities()

    return (
        <Container className="py-10 px-5">
            <Heading level={2}>Comunidades destacadas</Heading>

            <Separator className="my-10" />

            {!communities.length ? (
                <div>
                    <p className="text-center mt-10 text-lg text-muted-foreground">
                        No hay comunidades destacadas
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {communities.map(community => {

                        return (
                            <CommunityCard key={community.id} community={community} />
                        )
                    })}
                </div>
            )}
        </Container>
    )
}