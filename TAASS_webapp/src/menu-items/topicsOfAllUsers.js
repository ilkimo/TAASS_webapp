// assets
import { IconDashboard, IconShare } from '@tabler/icons';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

// constant
const icons = { IconDashboard, IconShare };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const topicsOfAllusers = {
    id: 'topicsOfAllusers',
    title: 'Shared Topics of Other Users',
    type: 'group',
    children: [
        {
            id: 'sharedTopics',
            title: 'All Topics',
            type: 'item',
            url: '/sharedTopicsOfUsers',
            icon: icons.IconShare,
            breadcrumbs: false
        }
    ]
};

export default topicsOfAllusers;
