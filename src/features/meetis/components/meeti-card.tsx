import { Heading } from "@/shared/components/typography/heading";
import { SelectMeeti } from "../types/meeti.types";
import Image from "next/image";
import { displayDate } from "@/shared/utils/date";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export function MeetiCard({
    meeti
}: {
    meeti: SelectMeeti
}) {
    return (
        <div className="bg-card border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="overflow-hidden">
                <Image
                    src={meeti.image}
                    alt={`Imagen del meeti ${meeti.title}`}
                    width={600}
                    height={400}
                    className="object-cover h-72 w-full transition-transform duration-300 ease-in-out hover:scale-120"
                />
            </div>
            <div className="p-5 space-y-5">
                <p className="text-sm text-muted-foreground">
                    {displayDate(meeti.date)}
                </p>
                <Heading level={3} className="text-2xl font-bold h-16">
                    {meeti.title}
                </Heading>
                <div className="flex items-center gap-5">
                    <p className="line-clamp-2">
                        {meeti.details}
                    </p>
                </div>
                <Button asChild variant={'link'}>
                    <Link
                        href={`/meetis/${meeti.id}`}
                    >
                        Ver Meeti
                    </Link>
                </Button>
            </div>
        </div>
    )
}