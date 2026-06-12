import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Logo } from "@/shared/components/ui/logo";

export default function NotFoundPage() {
    return (
        <main className="w-full flex min-h-screen flex-col items-center justify-center gap-8 py-10">
            <Link href={'/'}>
                <Logo />
            </Link>

            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="bg-muted mx-auto flex size-14 items-center justify-center rounded-full">
                        <SearchX className="text-muted-foreground size-7" />
                    </div>

                    <CardTitle className="text-2xl">
                        Categoría no encontrada
                    </CardTitle>

                    <CardDescription>
                        Parece que la categoría que buscas no existe
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft />
                            Regresar al inicio
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}