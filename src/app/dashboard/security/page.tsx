import { ActiveSessionsList } from "@/features/auth/components/active-sessions-list";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = 'Ajustes y Seguridad'

export const metadata: Metadata = {
    title
}

export default async function SecurityPage() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

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
                <Separator className="my-10" />
                <ActiveSessionsList />
            </Container>
        </>
    )
}