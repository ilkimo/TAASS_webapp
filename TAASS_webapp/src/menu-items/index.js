import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import customPages from './customPages';
import topicsOfAllusers from './topicsOfAllUsers';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [customPages, topicsOfAllusers, dashboard, utilities, other]
};

export default menuItems;
