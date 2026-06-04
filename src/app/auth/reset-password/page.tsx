import { SetPasswordForm } from "@/features/auth/components/set-password-form";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Definir nueva contraseña'
}

export default function ResetPasswordPage() {
    return (
        <div className="w-9/10 max-w-2xl">
            <Heading className="text-center mb-8">
                Definir nuevo password
            </Heading>

            <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Cargando formulario...</p>}>
                <SetPasswordForm />
            </Suspense>
            
            <nav className="mt-4 px-4 flex justify-between font-bold">
                <Link
                    href="/auth/sign-in"
                >
                    Iniciar sesión
                </Link>
                <Link
                    href="/auth/sign-up"
                >
                    Crear cuenta
                </Link>
            </nav>
        </div>
    )
}