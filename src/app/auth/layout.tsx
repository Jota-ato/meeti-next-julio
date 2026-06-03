import { Logo } from "@/shared/components/ui/logo";
import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="flex justify-center pt-10">
                <Link href='/' className="w-48 flex items-center justify-center">
                    <Logo />
                </Link>
            </header>
            <main className="flex flex-col items-center justify-center py-16 px-5">
                {children}
            </main>
        </>
    );
}