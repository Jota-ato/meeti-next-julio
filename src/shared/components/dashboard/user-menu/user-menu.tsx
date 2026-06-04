'use client';
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ThemeMenu } from "../user-menu/theme-menu";
import { SignOutMenuItem } from "../user-menu/sign-out-menu-item";
import { UserLinks } from "../user-menu/user-links";

export function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="cursor-pointer"
                >
                    <Bars3Icon className="size-6" />
                    <span className="sr-only">
                        Abrir menú de usuario
                    </span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        Links
                    </DropdownMenuLabel>
                    <UserLinks />
                    <ThemeMenu />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignOutMenuItem />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}