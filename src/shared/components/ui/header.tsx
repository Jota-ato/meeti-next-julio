import Link from "next/link";
import { Logo } from "./logo";
import { GuestNavigation } from "./guest-navigation";
import { requireAuth } from "@/lib/auth-server";
import { UserNavigation } from "./user-navigation";
import { Container } from "./container";

export async function Header() {

    const { isAuth } = await requireAuth()

    return (
        <header>
            <Container className="sm:flex sm:justify-between sm:items-center p-5 lg:px-0">
                <div className="flex justify-center py-10 sm:py-0">
                    <Link
                        href='/'
                        className="flex items-center sm:justify-center"
                    >
                        <Logo />
                    </Link>
                </div>
                {
                    isAuth ? <UserNavigation />:
                        <GuestNavigation />
                }
            </Container>
        </header>
    )
}