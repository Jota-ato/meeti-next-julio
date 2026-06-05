"use client"

import Link from "next/link"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Button } from "@/shared/components/ui/button"
import { SelectCommunity } from "../types/community.types";
import { useCommunityStore } from "../stores/community.store";

type Props = {
    community: SelectCommunity
}

export function CommunityDropdownMenu({ community }: Props) {

    const { toggleOpen, setCommunity } = useCommunityStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-accent-foreground"
                >
                    <span className="sr-only">Abrir Menú</span>
                    <EllipsisVerticalIcon className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-32 space-y-1 transition-colors duration-300">

                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/communities`}>
                        Ver Miembros <span className="sr-only">, {community.name}</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/communities/${community.id}/edit`}>
                        Editar <span className="sr-only">, {community.name}</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => {
                        toggleOpen()
                        setCommunity(community)
                    }}
                    className="text-destructive cursor-pointer hover:bg-destructive/10! hover:text-destructive!"
                >
                    Eliminar <span className="sr-only">, {community.name}</span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}