import Image from "next/image";
import { SelectCommunity } from "../types/community.types";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/typography/heading";

export function CommunityCard({
    community
}: {
    community: SelectCommunity
}) {
    return (
        <div className="rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow h-full">
            <div className="overflow-hidden">
                <Image
                    src={community.image ? community.image : 'img/default.jpg'}
                    alt={`Imagen de comunidad ${community.name}`}
                    height={400}
                    width={600}
                    className="object-cover h-60 w-full transition-transform duration-300 ease-in-out hover:scale-120"
                />
            </div>
            <div className="p-5 space-y-5">
                <Heading level={3}>{community.name}</Heading>
                <p className="line-clamp-2">{community.description}</p>
                <Button
                    asChild
                    variant={'link'}
                >
                    <Link
                        href={`/communities/${community.id}`}
                    >
                        Ver Comunidad
                    </Link>
                </Button>
            </div>
        </div>
    )
}