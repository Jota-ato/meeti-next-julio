import Link from "next/link";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Route } from "next";


const dropDownItems: {
    href: Route;
    label: string;
}[] = [
        {
            href: "/dashboard/profile",
            label: "Ver tu perfil",
        },
        {
            href: "/dashboard/profile",
            label: "Administra tu Perfil",
        },
        {
            href: "/dashboard/security",
            label: "Seguridad",
        },
    ];


export function UserLinks() {
    return (
        <>
            {dropDownItems.map((item) => (
                <DropdownMenuItem
                    key={item.href}
                    asChild
                >
                    <Link href={item.href}>
                        {item.label}
                    </Link>
                </DropdownMenuItem>
            ))}
        </>
    );
}