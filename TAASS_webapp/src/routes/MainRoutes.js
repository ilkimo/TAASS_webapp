import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import TopicRecordsPage from '../views/topics/topicRecordsPage';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const Topics = Loadable(lazy(() => import('views/topics/topics')));
const AddTopic = Loadable(lazy(() => import('views/topics/addTopic')));

const Profile = Loadable(lazy(() => import('views/profile/profile')));
const Settings = Loadable(lazy(() => import('views/settings/settings')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/topics',
            element: <Topics />
        },
        {
            path: '/addTopic',
            element: <AddTopic />
        },
        {
            path: '/topicRecordsPage',
            element: <TopicRecordsPage />
        },
        {
            path: '/profile',
            element: <Profile />
        },
        {
            path: '/settings',
            element: <Settings />
        }
    ]
};

export default MainRoutes;
