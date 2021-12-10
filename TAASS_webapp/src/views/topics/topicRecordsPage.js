// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { TextField, FormControl, Divider, Modal } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconNotebook } from '@tabler/icons';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { BlockPicker, CirclePicker } from 'react-color'; /* https://casesandberg.github.io/react-color/ */
import Collapse from '@mui/material/Collapse';
import TopicCardHomepage from './topicCardHomepage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// ==============================|| TYPOGRAPHY ||============================== //
import PropTypes from 'prop-types';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import TopicCard from './topicCard';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const location = useLocation();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            color={location.state.item.firstcolor}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
};

const modalStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4
};

// const [this.formValues, setFormValues] = useState([{ name: '', fieldType: '' }]);
// const [this.topicValues, setTopicValues] = useState([{ topicName: '', topicDescription: '' }]);

const TopicRecordsPage = (props) => {
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [show, setShow] = useState(false);

    const location = useLocation();

    const params = useParams();
    console.log(props);

    console.log(location);

    const state = location.state;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeSearchValue = (event, newValue) => {
        setSearchValue(event.target.value);

        // TODO: QUA FILTRARE LA LISTA
        console.log(event.target.value);
        console.log('QUA FILTRARE LA LISTA');
    };

    const handleModalClose = (event, newValue) => {
        setShow(false);
    };

    const handleModalShow = (event, newValue) => {
        console.log('MOSTRO IL MODAL');
        setShow(true);
    };

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogSubmit = () => {
        console.log();
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [dateValue, dateValueSetValue] = React.useState(new Date());

    const handleDateTimeChange = (newValue) => {
        dateValueSetValue(newValue);
    };

    return (
        <>
            <MainCard>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        lg={9}
                        md={9}
                        sm={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Link
                                to={{
                                    pathname: '/topics/'
                                }}
                                // state={{ item: topic }}
                            >
                                <ArrowBackIcon
                                    className="iconColor mx-4"
                                    fontSize="medium"
                                    style={{ fill: location.state.item.firstcolor, marginRight: '20' }}
                                />
                            </Link>

                            <Typography component="span" variant="h2">
                                <div>{location.state.item.title}</div>
                            </Typography>
                            <EditIcon className="iconColor mx-4" fontSize="medium" style={{ fill: location.state.item.firstcolor }} />
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={3}
                        md={3}
                        sm={12}
                        style={{
                            paddingTop: 0
                        }}
                    >
                        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={searchValue || ''}
                                onChange={handleChangeSearchValue}
                                endAdornment={<SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                size="small"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <div className="pageStyle">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                TabIndicatorProps={{
                                    style: { background: location.state.item.firstcolor }
                                }}
                            >
                                <Tab
                                    label={
                                        <span style={{ color: location.state.item.firstcolor }}>I miei {location.state.item.title}</span>
                                    }
                                    {...a11yProps(0)}
                                />
                                <Tab label={<span style={{ color: location.state.item.firstcolor }}>Performance</span>} {...a11yProps(1)} />
                                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            I miei {location.state.item.title}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Performance
                        </TabPanel>
                        {/*

                            <TabPanel value={this.state.value} index={2}>
                                Item Three
                            </TabPanel>

                             */}
                    </Box>
                </div>
                <Fab
                    onClick={handleClickOpen('paper')}
                    color={location.state.item.firstcolor}
                    aria-label="add"
                    style={{
                        backgroundColor: location.state.item.firstcolor,
                        margin: 0,
                        top: 'auto',
                        right: 20,
                        bottom: 20,
                        left: 'auto',
                        position: 'fixed',
                        color: 'white'
                    }}
                >
                    <AddIcon />
                </Fab>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">
                        <div>
                            <Typography component="span" variant="h2">
                                <div>Add Record - {state.item.title}</div>
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            {state.item.data.map(function (d, i) {
                                if (d.type === 'Text') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField id="outlined-basic" label={`${d.name}`} variant="outlined" />
                                        </FormControl>
                                    );
                                }
                                if (d.type === 'Integer Number') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField label={`${d.name}`} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                        </FormControl>
                                    );
                                }
                                if (d.type === 'Date') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} key={i}>
                                                <DesktopDatePicker
                                                    label={`${d.name}`}
                                                    inputFormat="MM/dd/yyyy"
                                                    value={dateValue}
                                                    onChange={handleDateTimeChange}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    );
                                }
                                return <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i} />;
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDialogSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </MainCard>
        </>
    );
};

export default TopicRecordsPage;
