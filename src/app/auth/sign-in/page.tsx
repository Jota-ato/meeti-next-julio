import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Iniciar Sesión"
}

export default function SignInPage() {
    return (
        <>
            <Heading className="text-center">
                Iniciar sesión
            </Heading>
        </>
    )
}