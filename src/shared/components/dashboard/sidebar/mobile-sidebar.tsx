"use client"
import { usePathname } from 'next/navigation';
import { MdMenu, MdPerson } from 'react-icons/md';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/shared/components/ui/sidebar"
import { Logo } from '../../ui/logo'
import { navigation, userNavigation } from './constants';
import { SidebarNavGroup } from './sidebar-nav-group';
import { SignOutButton } from './sign-out-button';

export function DashboardSidebar() {
    const pathName = usePathname()
    const { state } = useSidebar()
    const isCollapsed = state === 'collapsed'

    return (
        <Sidebar>
            <SidebarHeader>
                <Logo className="mx-auto" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarNavGroup
                    label="Navegación"
                    groupIcon={MdMenu}
                    items={navigation}
                    pathName={pathName}
                    isCollapsed={isCollapsed}
                />
                <SidebarNavGroup
                    label="Menú de usuario"
                    groupIcon={MdPerson}
                    items={userNavigation}
                    pathName={pathName}
                    isCollapsed={isCollapsed}
                />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    )
}