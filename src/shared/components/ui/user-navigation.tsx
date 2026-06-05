import Link from "next/link";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
import { SignOutButton } from "../dashboard/sidebar/sign-out-button";

export function UserNavigation() {
    return (
        <>
            <nav className="flex justify-center items-center gap-4 mt-5 md:mt-0 px-4">
                <Button
                    asChild
                    variant="outline"
                >
                    <Link
                        className="font-bold text-sm sm:text-base"
                        href={"/dashboard"}
                    >
                        Ver dashboard
                    </Link>
                </Button>
                <SignOutButton />
                <ThemeToggle />
            </nav>
        </>
    )
}