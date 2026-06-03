import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear Cuenta"
}

export default function SignUpPage() {
    return (
        <>
            <Heading className="text-center">
                Crear cuenta
            </Heading>
        </>
    )
}