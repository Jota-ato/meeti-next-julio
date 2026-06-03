import { SignUpForm } from "@/features/auth/components/register-form";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear Cuenta"
}

export default function SignUpPage() {
    return (
        <div className="w-9/10 max-w-2xl">
            <Heading className="text-center">
                Crear cuenta
            </Heading>
            <SignUpForm />
        </div>
    )
}