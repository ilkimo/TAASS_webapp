import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser, IconUserCircle } from '@tabler/icons';
import { browserHistory } from 'react-router';
import { ReactSession } from 'react-client-session';

import { useSession, loadDataFromStorage, getSession, setSession, removeSession } from 'react-session-persist';

import GoogleLogout from 'react-google-login';
import { gapi } from 'gapi-script';
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [loggedWithGoogle, setLoggedWithGoogle] = useState(false);
    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        console.log('Logout');

        removeSession();

        /* TODO: GESTIRE LA SESSIONE UTENTE */
        ReactSession.remove('id');
        ReactSession.remove('username');
        ReactSession.remove('password');
        ReactSession.remove('googleLogin');

        navigate('../pages/login/login3', { replace: true });
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    const logout = (response) => {
        const auth2 = gapi.auth2.getAuthInstance();

        if (auth2 != null) {
            auth2.signOut().then(
                auth2.disconnect().then(function () {
                    console.log('LOGOUT SUCCESSFUL');

                    ReactSession.remove('id');
                    ReactSession.remove('username');
                    ReactSession.remove('password');
                    ReactSession.remove('googleLogin');

                    navigate('../pages/login/login3', { replace: true });
                })
            );
        }
    };

    const handleLogoutFromGoogle = async (resp) => {
        console.log(resp);

        console.log('Logout from Google');

        removeSession();

        /* TODO: GESTIRE LA SESSIONE UTENTE */
        ReactSession.remove('id');
        ReactSession.remove('username');
        ReactSession.remove('password');
        ReactSession.remove('googleLogin');

        navigate('../pages/login/login3', { replace: true });
    };

    useEffect(() => {
        async function getSessionUser() {
            // You need to restrict it at some point
            // This is just dummy code and should be replaced by actual
            const session = await getSession();
            console.log(session);
            setUser(session.user);

            console.log(session.googleLogin);

            setLoggedWithGoogle(session.googleLogin);
        }

        getSessionUser();
    }, []);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.secondary.light,
                    backgroundColor: theme.palette.secondary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.secondary.main,
                        background: `${theme.palette.secondary.main}!important`,
                        color: theme.palette.secondary.light,
                        '& svg': {
                            stroke: theme.palette.secondary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                /*
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                 */
                label={<IconUserCircle stroke={1.5} size="1.5rem" color={theme.palette.secondary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography variant="h4">Good Morning,</Typography>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                    {user.email}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                    </Box>
                                    <PerfectScrollbar
                                        style={{
                                            height: '100%',
                                            maxHeight: 'calc(100vh - 250px)',
                                            overflowX: 'hidden'
                                        }}
                                    >
                                        <Box sx={{ p: 2 }}>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 0}
                                                    onClick={(event) => handleListItemClick(event, 0, '/profile')}
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                </ListItemButton>

                                                {/* if */}
                                                {loggedWithGoogle ? (
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={logout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={<Typography variant="body2">Logout from Google</Typography>}
                                                        />
                                                    </ListItemButton>
                                                ) : (
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                    </ListItemButton>
                                                )}

                                                {/* Google Logout
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                >
                                                    <GoogleLogout buttonText="Logout" onLogoutSuccess={handleLogoutFromGoogle} />
                                                </ListItemButton>
                                                */}
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
