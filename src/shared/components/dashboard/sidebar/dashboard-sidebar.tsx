"use client"
import { usePathname } from 'next/navigation';
import { MdMenu, MdPerson } from 'react-icons/md';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    useSidebar,
} from "@/shared/components/ui/sidebar"
import { Logo } from '../../ui/logo'
import { navigation, userNavigation } from './constants';
import { NavItem, SidebarNavGroup } from './sidebar-nav-group';
import { SignOutButton } from './sign-out-button';
import { ThemeToggleSideBar } from './theme-toggle-sidebar';
import { User } from '@/features/auth/types/auth.types';
import { FaUserCircle } from 'react-icons/fa';
import { Route } from 'next';

export function DashboardSidebar({
    user
}: {
    user: User
}) {
    const pathName = usePathname()
    const { state } = useSidebar()
    const isCollapsed = state === 'collapsed'
    const userNav: NavItem[] = [{
        href: `/profiles/${user.id}` as Route,
        label: 'Ver tu perfil',
        icon: FaUserCircle,
    }, ...userNavigation
    ]

    return (
        <Sidebar collapsible="icon">
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
                    items={userNav}
                    pathName={pathName}
                    isCollapsed={isCollapsed}
                />
                <ThemeToggleSideBar
                    isCollapsed={isCollapsed}
                />
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    )
}