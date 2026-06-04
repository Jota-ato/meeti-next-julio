"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu"



export function ThemeToggle({
    showLabel = false,
}: {
    showLabel?: boolean;
}) {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size={showLabel ? "default" : "icon"}
                    className={showLabel ? "gap-2" : undefined}
                >
                    <span className="relative h-4 w-4">
                        <Sun className="absolute inset-0 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute inset-0 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </span>

                    {showLabel ? (
                        <span>Cambiar tema</span>
                    ) : (
                        <span className="sr-only">Cambiar tema</span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Claro
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Oscuro
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("system")}>
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
