import Link from "next/link";
import { Logo } from "./logo";
import { GuestNavigation } from "./guest-navigation";

export function Header() {
    return (
        <header className="border-b border-gray-200">
            <div className="sm:flex sm:justify-between sm:items-center max-w-7xl mx-auto p-5 lg:px-0">
                <div className="flex justify-center py-10 sm:py-0">
                    <Link
                        href='/'
                        className="flex items-center sm:justify-center"
                    >
                        <Logo />
                    </Link>
                </div>
                <GuestNavigation />
            </div>
        </header>
    )
}