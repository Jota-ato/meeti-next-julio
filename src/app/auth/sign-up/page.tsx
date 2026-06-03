import { SignUpForm } from "@/features/auth/components/register-form";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Crear Cuenta"
}

export default function SignUpPage() {
    return (
        <div className="w-9/10 max-w-2xl">
            <Heading className="text-center mb-8">
                Crear cuenta
            </Heading>
            <SignUpForm />

            <nav className="mt-4 px-4 flex justify-between font-bold">
                <Link
                    href="/auth/sign-in"
                >
                    Iniciar sesión
                </Link>
                <Link
                    href="/auth/forgot-password"
                >
                    Olvide mi contraseña
                </Link>
            </nav>
        </div>
    )
}