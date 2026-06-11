import { ProfileForm } from "@/features/profile/components/profile-form";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = 'Administra tu perfil'

export const metadata: Metadata = {
    title
}

export default async function ProfilePage() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/sign-in')

    return (
        <Container>
            <Heading>{title}</Heading>

            <Card>
                <CardContent>
                    <ProfileForm
                        user={session.user}
                    />
                </CardContent>
            </Card>
        </Container>
    )
}