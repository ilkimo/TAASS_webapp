// assets
import { IconDashboard, IconUserCircle, IconSettings, IconNotebook } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUserCircle, IconSettings, IconNotebook };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const customPages = {
    id: 'customPages',
    title: 'Custom Pages',
    type: 'group',
    children: [
        {
            id: 'topics',
            title: 'Topics',
            type: 'item',
            url: '/topics/',
            icon: icons.IconNotebook,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/profile/',
            icon: icons.IconUserCircle,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings/',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default customPages;
