"use client"

import Link from "next/link"
import { ArrowLeft, TriangleAlert } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {
    return (
        <main className="w-full flex flex-col items-center justify-center gap-8 py-10 h-screen">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="bg-muted mx-auto flex size-14 items-center justify-center rounded-full">
                        <TriangleAlert className="text-muted-foreground size-7" />
                    </div>

                    <CardTitle className="text-2xl">
                        Ocurrió un error
                    </CardTitle>

                    <CardDescription>
                        {error.message}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft />
                            Regresar al inicio
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}