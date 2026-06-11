import { Footer } from "@/shared/components/ui/footer";
import { Header } from "@/shared/components/ui/header";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-full">
            <Header />
            {children}

            <Footer />
        </div>
    );
}
