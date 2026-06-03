import { SignInForm } from "@/features/auth/components/sign-in-form";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Iniciar Sesión"
}

export default function SignInPage() {
    return (
        <div className="w-9/10 max-w-2xl">
            <Heading className="text-center">
                Iniciar sesión
            </Heading>
            <SignInForm />
        </div>
    )
}