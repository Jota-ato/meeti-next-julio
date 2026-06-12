import { meetiService } from "../sevices/meeti-service";
import { MeetiCard } from "./meeti-card";

export async function CategoryMeetis({
    categoryId
}: {
    categoryId: string
}) {

    const meetis = await meetiService.getMeetisByCategory(categoryId)

    return (
        <>
            {meetis.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 py-10 gap-5">
                    {meetis.map(meeti => (
                        <MeetiCard key={meeti.id} meeti={meeti} />
                    ))}
                </div>
            ) : (
                <p className="text-center mt-10 text-lg text-accent-foreground">
                    No hay próximos Meetis en esta categoria
                </p>
            )}
        </>
    )
}