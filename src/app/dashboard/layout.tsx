import { auth } from "@/lib/auth";
import { NotificationsPanel } from "@/shared/components/dashboard/notifications-panel";
import { DashboardSidebar } from "@/shared/components/dashboard/sidebar/dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
    children
}: {
    children: ReactNode
}) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth/sign-in")
    }

    return (
        <>
            <SidebarProvider>
                <DashboardSidebar
                    user={session.user}
                />
                <main className="min-h-screen w-full relative py-12 sm:py-16">
                    <SidebarTrigger className="absolute top-2 left-4 z-20" />
                    <NotificationsPanel />
                    {children}
                </main>
            </SidebarProvider>
        </>
    )
}