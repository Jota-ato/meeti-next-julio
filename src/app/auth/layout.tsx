import { Logo } from "@/shared/components/ui/logo";
import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex justify-center pt-10">
                <Link href='/' className="w-48 flex items-center justify-center">
                    <Logo />
                </Link>
            </div>
            <main className="flex items-center justify-center py-16 px-5">
                {children}
            </main>
        </>
    );
}