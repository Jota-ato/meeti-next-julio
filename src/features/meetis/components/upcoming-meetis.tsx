import { Container } from "@/shared/components/ui/container";
import { meetiService } from "../sevices/meeti-service";
import { MeetiCard } from "./meeti-card";
import { Heading } from "@/shared/components/typography/heading";
import { Separator } from "@/shared/components/ui/separator";

export async function UpcomingMeetis() {

    const meetis = await meetiService.getUpcoming()

    return (
        <Container className="py-10 px-5">
            <Heading level={2}>Próximos Meetis</Heading>

            <Separator className="my-10" />

            {!meetis.length ? (
                <div>
                    No hay próximos meetis
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {meetis.map(meeti => (
                        <MeetiCard key={meeti.id} meeti={meeti} />
                    ))}
                </div>
            )}
        </Container>
    )
}