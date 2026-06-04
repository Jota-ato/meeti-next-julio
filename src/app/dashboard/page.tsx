import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Dashboard'
}

export default async function DashboardPage() {

    const { isAuth } = await requireAuth()
    if (!isAuth) redirect('/auth/sign-in')

    return (
        <div>
            <Heading className="text-center">
                Panel de administración
            </Heading>
        </div>
    )
}