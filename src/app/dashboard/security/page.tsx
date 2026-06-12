import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { Heading } from "@/shared/components/typography/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { Metadata } from "next";

const title = 'Ajustes y Seguridad'

export const metadata: Metadata = {
    title
}

export default function SecurityPage() {
    return (
        <>
            <Heading>{title}</Heading>
            <Container className="py-10">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Heading level={2}>
                                Cambiar Password
                            </Heading>
                        </CardTitle>
                        <CardDescription className="sr-only">
                            Cambiar contraseña
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChangePasswordForm />
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}