import { DashboardSidebar } from "@/shared/components/dashboard/sidebar/dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { ReactNode } from "react";

export default async function DashboardLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <>
            <SidebarProvider>
                <DashboardSidebar />
                <main className="min-h-screen w-full relative py-12 sm:py-16">
                    <SidebarTrigger className="absolute top-2 left-4 z-20" />
                    {children}
                </main>
            </SidebarProvider>
        </>
    )
}