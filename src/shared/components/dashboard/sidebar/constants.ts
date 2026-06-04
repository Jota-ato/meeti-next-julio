import { Route } from 'next';
import { IconType } from 'react-icons';
import {
    MdDashboard,
    MdGroups,
    MdEvent,
    MdNotifications,
} from 'react-icons/md';
import {
    FaUserCircle,
    FaUserCog,
    FaShieldAlt,
} from 'react-icons/fa';

type navigationType = {
    label: string;
    href: Route;
    icon: IconType;
};

export const navigation: navigationType[] = [
    { label: 'Panel de Administración', href: '/dashboard', icon: MdDashboard },
    { label: 'Comunidades', href: '/dashboard/communities', icon: MdGroups },
    { label: 'Meetis', href: '/dashboard/meetis', icon: MdEvent },
    { label: 'Notificaciones', href: '/dashboard/notifications', icon: MdNotifications },
];

export const userNavigation: {
    href: Route;
    label: string;
    icon: IconType;
}[] = [
        {
            href: '/dashboard/profile',
            label: 'Ver tu perfil',
            icon: FaUserCircle,
        },
        {
            href: '/dashboard/profile',
            label: 'Administra tu Perfil',
            icon: FaUserCog,
        },
        {
            href: '/dashboard/security',
            label: 'Seguridad',
            icon: FaShieldAlt,
        },
    ];