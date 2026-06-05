import Image from "next/image";
import { CommunityWithPermissions } from "../types/community.types";
import Link from "next/link";
import { CommunityDropdownMenu } from "./community-dropdown-menu";
import { Button } from "@/shared/components/ui/button";

export function CommunityItem({
    community
}: {
    community: CommunityWithPermissions
}) {

    const { image, name, description, id } = community.data

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex flex-col md:flex-row items-stretch w-full h-auto bg-card p-4 gap-4 rounded-xl shadow-shadow border-card-foreground text-card-foreground overflow-hidden">
                <div className="relative w-full max-w-150 md:max-w-60 shrink-0 min-h-35">
                    <Image
                        src={image}
                        alt={`Imagen Comunidad ${name}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <article className="flex flex-col p-5 flex-1">
                    <header className="p-0 flex flex-col gap-y-1">
                        <Button className="block px-0 text-accent-foreground" asChild variant={'link'}>
                            <Link className="/" href={`/communities/${id}`}>
                                {name}
                            </Link>
                        </Button>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                            {description}
                        </p>
                    </header>

                    <main className="p-0 mt-2">
                        <span className="text-xs text-muted-foreground">Comunidad activa</span>
                    </main>
                </article>

                <div className="flex shrink-0 items-center">
                    <CommunityDropdownMenu community={community.data} />
                </div>
            </div>
        </li>
    )
}