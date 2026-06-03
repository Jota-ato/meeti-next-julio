import Link from "next/link";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

export function GuestNavigation() {
    return (
        <nav className="flex justify-center items-center gap-4 mt-5 md:mt-0 px-4">
            <Button
                asChild
                variant="outline"
            >
                <Link
                    className="font-bold text-sm sm:text-base"
                    href="/auth/sign-in"
                >
                    Iniciar Sesión
                </Link>
            </Button>
            <Button
                asChild
            >
                <Link
                    href="/auth/sign-up"
                >
                    Registrarse
                </Link>
            </Button>
            <ThemeToggle />

        </nav>
    )
}