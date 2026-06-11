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

export default function CommunityNotFoundPage() {
    return (
        <main className="w-full flex flex-col items-center justify-center gap-8 py-10">
            <Link href={'/'}>
                <Logo />
            </Link>

            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="bg-muted mx-auto flex size-14 items-center justify-center rounded-full">
                        <SearchX className="text-muted-foreground size-7" />
                    </div>

                    <CardTitle className="text-2xl">
                        Comunidad no encontrada
                    </CardTitle>

                    <CardDescription>
                        La comunidad que intentas visitar no existe,
                        fue eliminada o el enlace es incorrecto.
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
