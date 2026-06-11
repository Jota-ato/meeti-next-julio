"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { SelectMeeti } from "../types/meeti.types"
import Link from "next/link"

type Props = {
    meeti: SelectMeeti
}

export function MeetiDropdownMenu({ meeti }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex-none">
                <span className="sr-only">Abrir Menú</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem asChild>
                    <Link
                        href={`/meetis/${meeti.id}`}
                        target="_blank">
                        Ver Meeti <span className="sr-only"
                        >, {meeti.title}</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                    href={`/dashboard/meetis/${meeti.id}/attendees`}
                    target="_blank"
                    >
                        Ver Asistentes <span className="sr-only">, {meeti.title}</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/meetis/${meeti.id}/edit`}>
                        Editar <span className="sr-only">, {meeti.title}</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-destructive! cursor-pointer hover:bg-destructive/10! hover:text-destructive!"
                >
                    <button type="button">
                        Eliminar <span className="sr-only">, {meeti.title}</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}