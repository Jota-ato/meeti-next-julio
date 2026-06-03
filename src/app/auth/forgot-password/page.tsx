import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Recuperar contraseña'
}

export default function ForgotPasswordPage() {
    return (
        <div className="w-9/10 max-w-2xl">
            <Heading className="text-center mb-8">
                Recupera tu acceso a meeti
            </Heading>
            <ForgotPasswordForm />

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