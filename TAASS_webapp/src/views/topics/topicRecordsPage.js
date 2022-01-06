// project imports
import MainCard from 'ui-component/cards/MainCard';
import {
    TextField,
    FormControl,
    Divider,
    Modal,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Switch,
    MenuItem,
    Menu,
    Avatar,
    IconButton
} from '@mui/material';
import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// eslint-disable-next-line import/no-extraneous-dependencies

// ==============================|| TYPOGRAPHY ||============================== //
import PropTypes from 'prop-types';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import { forEach } from 'react-bootstrap/ElementChildren';
import TopicCard from './topicCard';
import TopicRecordCard from './topicRecordCard';

/* Test histogram */
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { Bar } from 'react-chartjs-2';
import * as $ from 'jquery';
import { ReactSession } from 'react-client-session';
import { getSession } from 'react-session-persist/lib';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Number of record added in each month'
        }
    }
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopicRecordsPage = (props) => {
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [show, setShow] = useState(false);

    const [theArray, setTheArray] = useState([]);

    const [recordDetails, setRecordDetails] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

    const params = useParams();

    const state = location.state;

    const [topicName, setTopicName] = useState([state.item.name]);

    const formValues = [];

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    /* TODO: costruire questa struttura andando a contare quanti record sono stati inseriti in ogni mese */
    let data = {
        labels,
        datasets: [
            {
                label: `My ${topicName[0]}`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: location.state.item.color[2]
            }
        ]
    };

    if (theArray.length === 0) {
        console.log(state.item.nameType);

        state.item.nameType.forEach((element) => {
            if (element.data === 'Text') {
                theArray.push({ value: '' });
            } else if (element.data === 'Integer Number') {
                theArray.push({ value: 0 });
            } else if (element.data === 'Floating Point Number') {
                theArray.push({ value: 0.0 });
            } else if (element.data === 'Date') {
                theArray.push({ value: new Date() });
            } else if (element.data === 'Hour') {
                theArray.push({ value: '' });
            }

            if (element.data === 'Text') {
                recordDetails.push({ value: '' });
            } else if (element.data === 'Integer Number') {
                recordDetails.push({ value: 0 });
            } else if (element.data === 'Floating Point Number') {
                recordDetails.push({ value: 0.0 });
            } else if (element.data === 'Date') {
                recordDetails.push({ value: new Date() });
            } else if (element.data === 'Hour') {
                recordDetails.push({ value: '' });
            }

            // console.log(element.name);
            console.log(theArray);
            console.log(recordDetails);
        });

        /* TODO: da sistemare perchè non funziona */
        state.item.listRegistrazioni.forEach((record) => {
            let month = record.creationDate.month;

            console.log(month);

            switch (month) {
                case '01':
                    data.datasets[0].data[0] += 1;
                    break;
                case '02':
                    data.datasets[0].data[1] += 1;
                    break;
                case '03':
                    data.datasets[0].data[2] += 1;
                    break;
                case '04':
                    data.datasets[0].data[3] += 1;
                    break;
                case '05':
                    data.datasets[0].data[4] += 1;
                    break;
                case '06':
                    data.datasets[0].data[5] += 1;
                    break;
                case '07':
                    data.datasets[0].data[6] += 1;
                    break;
                case '08':
                    data.datasets[0].data[7] += 1;
                    break;
                case '09':
                    data.datasets[0].data[8] += 1;
                    break;
                case '10':
                    data.datasets[0].data[9] += 1;
                    break;
                case '11':
                    data.datasets[0].data[10] += 1;
                    break;
                case '12':
                    data.datasets[0].data[11] += 1;
                    break;
                default:
                    break;
            }
        });
    }

    console.log('DATA');
    console.log(data.datasets[0]);

    const handleTopicNameChange = (event, newValue) => {
        setTopicName(event.target.value);
    };

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

    /* Add record */
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [addRecordError, setAddRecordError] = React.useState(false);

    /**/
    const [openRecordDetails, setOpenRecordDetails] = React.useState(false);
    const [scrollRecordDetails, setScrollRecordDetails] = React.useState('paper');

    const [recordSelected, setRecordSelected] = React.useState(null);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenRecord = (scrollType, record) => () => {
        // settare record selezionato
        setRecordSelected(record);

        for (let i = 0; i < recordDetails.length; i += 1) {
            recordDetails[i].value = record.typeNameRegistration[i].val;
        }

        setOpenRecordDetails(true);
        setScrollRecordDetails(scrollType);
    };

    const handleCloseRecord = () => {
        setOpenRecordDetails(false);
    };

    const handleValueChange = (i, e) => {
        let newFormValues = [...theArray];
        newFormValues[i].value = e.target.value;

        setTheArray(newFormValues);
    };

    const handleDialogSubmit = async () => {
        console.log('VALORI INSERITI: ');
        console.log(theArray);

        let arrayVal = new Array(theArray.length);

        theArray.forEach(function (element, index) {
            // eslint-disable-next-line no-undef
            arrayVal[index] = element.value;
        });

        // controllo compilazione form
        let formOk = true;

        /* Controllare tutti i dati! Ogni valore deve essere stato inserito */
        arrayVal.forEach((elem) => {
            console.log(String(elem));
            if (String(elem).replace(/\s/g, '').length === 0) {
                setAddRecordError(true);
                formOk = false;
            }
        });

        const session = await getSession();
        console.log(session);

        if (formOk) {
            setAddRecordError(false);

            let obj = {
                userId: String(session.user.id),
                topic: location.state.item.name,
                dataList: arrayVal
            };

            console.log(obj);

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/gateway/newReg',
                data: JSON.stringify(obj),
                contentType: 'application/json;charset=utf-8'
            })
                .done((response) => {
                    console.log('RESPONSE');
                    console.log(response);

                    let objResponse = JSON.parse(response);
                    console.log(objResponse);

                    objResponse.topicList.forEach(function (element, index) {
                        if (element.name === location.state.item.name) {
                            location.state.item.listRegistrazioni = element.listRegistrazioni;
                        }
                    });
                    setOpen(false);
                })
                .fail((e, s, t) => {
                    console.log(`Failed: ${e.responseText}`);
                });
        }

        // setOpen(false);
    };

    /* Edit Topic Name */
    const [openEditTopic, setOpenEditTopic] = React.useState(false);
    const [scrollEditTopic, setScrollEditTopic] = React.useState('paper');

    const [topicNameChanged, setTopicNameChanged] = React.useState(false);
    const [topicNameChangedError, setTopicNameChangedError] = React.useState(false);

    const handleClickOpenEditTopic = (scrollType) => () => {
        setOpenEditTopic(true);
        setScrollEditTopic(scrollType);
    };

    const handleCloseEditTopic = () => {
        setOpenEditTopic(false);
    };

    const handleDialogEditTopicSubmit = async () => {
        console.log(`TOPIC MODIFICATO - nuovo nome: ${topicName}`);

        setOpenEditTopic(false);

        const session = await getSession();

        let obj = {
            id: session.user.id,
            name: location.state.item.name,
            newName: topicName
        };

        console.log(obj);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/gateway/changeNameTopic',
            data: JSON.stringify(obj),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);

                location.state.item.name = topicName;
                setOpenEditTopic(false);
                setTopicNameChanged(true);
                setTopicNameChangedError(false);
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
                setTopicNameChangedError(true);
                setTopicNameChanged(false);
            });
    };

    /* Delete topic */
    const [openDeleteTopicDialog, setOpenDeleteTopicDialog] = React.useState(false);
    const [scrollDeleteTopicDialog, setScrollDeleteTopicDialog] = React.useState('paper');

    const handleClickOpenDeleteTopicDialog = (scrollType) => () => {
        setOpenDeleteTopicDialog(true);
        setScrollDeleteTopicDialog(scrollType);
    };

    const handleCloseDeleteTopicDialog = () => {
        setOpenDeleteTopicDialog(false);
    };

    const handleDeleteTopic = async () => {
        // Query

        const session = await getSession();

        let obj = {
            id: session.user.id,
            name: location.state.item.name
        };

        console.log(obj);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/gateway/delTopic',
            data: JSON.stringify(obj),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);

                setOpenDeleteTopicDialog(false);

                navigate('/topics', { replace: false });
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });
    };

    /* Delete record */
    const [openDeleteRecordDialog, setOpenDeleteRecordDialog] = React.useState(false);
    const [scrollDeleteRecordDialog, setScrollDeleteRecordDialog] = React.useState('paper');

    const handleClickOpenDeleteRecordDialog = (scrollType) => () => {
        setOpenDeleteRecordDialog(true);
        setScrollDeleteRecordDialog(scrollType);
    };

    const handleCloseDeleteRecordDialog = () => {
        setOpenDeleteRecordDialog(false);
    };

    const handleDeleteRecord = async () => {
        // Query

        const session = await getSession();

        let obj = {
            idUser: session.user.id,
            idReg: recordSelected.id,
            topic: location.state.item.name
        };

        console.log(obj);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/gateway/delReg',
            data: JSON.stringify(obj),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);

                let objResponse = JSON.parse(response);

                /*
                response.forEach(function (element, index) {
                    if (element.name === location.state.item.name) {
                        location.state.item.listRegistrazioni = element.listRegistrazioni;
                    }
                });
                 */

                objResponse.topicList.forEach(function (element, index) {
                    if (element.name === location.state.item.name) {
                        location.state.item.listRegistrazioni = element.listRegistrazioni;
                    }
                });

                setOpenDeleteRecordDialog(false);
                setOpenRecordDetails(false);
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });
    };
    const handleExportTopicMenu = () => {};

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

    const handleDateTimeChange = (i, newValue) => {
        let newFormValues = [...theArray];
        newFormValues[i].value = newValue;

        setTheArray(newFormValues);
    };

    const handleTimeChange = (i, newValue) => {
        let newFormValues = [...theArray];
        newFormValues[i].value = newValue;

        setTheArray(newFormValues);
    };

    const [shareTopicsChecked, setShareTopicsChecked] = React.useState(location.state.item.shared);

    const handleShareSwitchChange = async (event) => {
        setShareTopicsChecked(!shareTopicsChecked);
        location.state.item.shared = !location.state.item.shared;
        setShareTopicsChecked(event.target.checked);

        const session = await getSession();

        let obj = {
            id: session.user.id,
            name: location.state.item.name,
            newName: null
        };

        console.log(obj);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/gateway/changSharedTopic',
            data: JSON.stringify(obj),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType });
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    const exportToJson = (e) => {
        e.preventDefault();
        downloadFile({
            data: JSON.stringify(location.state.item),
            fileName: `${location.state.item.name}.json`,
            fileType: 'text/json'
        });
    };

    return (
        <div>
            <MainCard>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={11}
                        lg={11}
                        md={11}
                        sm={11}
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
                                    style={{ fill: location.state.item.color[0], marginRight: '20' }}
                                />
                            </Link>

                            <Typography component="span" variant="h2">
                                <div>{location.state.item.name}</div>
                            </Typography>

                            <EditIcon
                                className="iconColor mx-4"
                                fontSize="medium"
                                style={{ fill: location.state.item.color[0], cursor: 'pointer' }}
                                onClick={handleClickOpenEditTopic('paper')}
                            />
                        </div>
                    </Grid>
                    <Grid
                        container
                        xs={1}
                        lg={1}
                        md={1}
                        sm={1}
                        style={{
                            paddingTop: 0
                        }}
                    >
                        <Grid item xs={12} lg={12} md={12} sm={12}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    backgroundColor: location.state.item.color[0],
                                    color: '#FFFFFF',
                                    zIndex: 1,
                                    mt: 1,
                                    ml: 2
                                }}
                                aria-controls="menu-earning-card"
                                aria-haspopup="true"
                                onClick={handleClickMenu}
                            >
                                <MoreHorizIcon fontSize="inherit" />
                            </Avatar>
                            <Menu
                                id="menu-earning-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={exportToJson}>
                                    <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Export Topic
                                </MenuItem>
                                <MenuItem onClick={handleClickOpenDeleteTopicDialog('paper')}>
                                    <DeleteForeverIcon sx={{ mr: 1.75 }} /> Delete Topic
                                </MenuItem>
                            </Menu>
                        </Grid>
                        {/*
                        <Grid
                            item
                            xs={10}
                            lg={10}
                            md={10}
                            sm={10}
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
                        */}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <FormControl component="fieldset">
                            <Typography component="span" variant="h4" sx={{ pl: 2, pt: 1 }}>
                                <div>Description: {location.state.item.description}</div>
                            </Typography>
                            <FormLabel component="legend" />
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="start"
                                    control={<Switch color="primary" checked={shareTopicsChecked} onChange={handleShareSwitchChange} />}
                                    label="Share this topic with others users"
                                    labelPlacement="start"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Collapse in={topicNameChanged}>
                    <Alert
                        variant="filled"
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setTopicNameChanged(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2, mt: 2 }}
                    >
                        Topic name changed!
                    </Alert>
                </Collapse>
                <Collapse in={topicNameChangedError}>
                    <Alert
                        variant="filled"
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setTopicNameChangedError(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2, mt: 2 }}
                    >
                        Error!
                    </Alert>
                </Collapse>

                <div className="pageStyle">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                TabIndicatorProps={{
                                    style: { background: location.state.item.color[0] }
                                }}
                            >
                                <Tab
                                    label={<span style={{ color: location.state.item.color[0] }}>I miei {location.state.item.name}</span>}
                                    {...a11yProps(0)}
                                />
                                <Tab label={<span style={{ color: location.state.item.color[0] }}>Performance</span>} {...a11yProps(1)} />
                                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {/* I miei {location.state.item.title} */}

                            {state.item.listRegistrazioni.length > 0
                                ? state.item.listRegistrazioni.map((record, i) => (
                                      <Grid
                                          item
                                          key={record}
                                          xs={12}
                                          sm={12}
                                          md={6}
                                          lg={6}
                                          onClick={handleClickOpenRecord('paper', record)}
                                      >
                                          <TopicRecordCard
                                              firstcolor={state.item.color[0]}
                                              secondcolor={state.item.color[1]}
                                              thirdcolor={state.item.color[2]}
                                              title={record.typeNameRegistration[0].val}
                                              date={record.typeNameRegistration[1].val.slice(0, 10)}
                                          />
                                      </Grid>
                                  ))
                                : 'Non ci sono record inseriti'}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {/* Performance */}
                            <Grid container>
                                <Grid item lg={9} md={12} s={12} xs={12}>
                                    <Bar options={options} data={data} />
                                </Grid>
                            </Grid>
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
                    color={location.state.item.color[0]}
                    aria-label="add"
                    style={{
                        backgroundColor: location.state.item.color[0],
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
                    open={openEditTopic}
                    onClose={handleCloseEditTopic}
                    scroll={scrollEditTopic}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">
                        <div>
                            <Typography component="span" variant="h2">
                                <div>Edit Topic - {state.item.name}</div>
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scrollEditTopic === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <TextField
                                    value={topicName}
                                    id="outlined-basic"
                                    label="Topic name"
                                    variant="outlined"
                                    onChange={handleTopicNameChange}
                                />
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditTopic}>Cancel</Button>
                        <Button onClick={handleDialogEditTopicSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>

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
                                <div>Add Record - {state.item.name}</div>
                            </Typography>
                            <Collapse in={addRecordError}>
                                <Alert
                                    variant="filled"
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setAddRecordError(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2, mt: 2 }}
                                >
                                    Please compile all data field!
                                </Alert>
                            </Collapse>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            {state.item.nameType.map((d, i) => {
                                if (d.data === 'Text') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField
                                                value={theArray[i].value}
                                                id="outlined-basic"
                                                label={`${d.name}`}
                                                variant="outlined"
                                                onChange={(e) => handleValueChange(i, e)}
                                            />
                                        </FormControl>
                                    );
                                }
                                if (d.data === 'Integer Number') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField
                                                value={theArray[i].value}
                                                // value={formValues[i].value}
                                                label={`${d.name}`}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                onChange={(e) => handleValueChange(i, e)}
                                            />
                                        </FormControl>
                                    );
                                }

                                if (d.data === 'Floating Point Number') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField
                                                value={theArray[i].value}
                                                // value={formValues[i].value}
                                                label={`${d.name}`}
                                                inputProps={{ inputMode: 'numeric', pattern: '([0-9]*[.])?[0-9]+' }}
                                                onChange={(e) => handleValueChange(i, e)}
                                            />
                                        </FormControl>
                                    );
                                }

                                if (d.data === 'Date') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} key={i}>
                                                <DesktopDatePicker
                                                    label={`${d.name}`}
                                                    inputFormat="MM/dd/yyyy"
                                                    value={theArray[i].value}
                                                    // value={formValues[i].value}
                                                    onChange={(e) => handleDateTimeChange(i, e)}
                                                    // onChange={handleDateTimeChange(i)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    );
                                }

                                if (d.data === 'Hour') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} key={i}>
                                                <TimePicker
                                                    label={`${d.name}`}
                                                    value={theArray[i].value}
                                                    onChange={(e) => handleTimeChange(i, e)}
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

                <Dialog
                    open={openRecordDetails}
                    onClose={handleCloseRecord}
                    scroll={scrollRecordDetails}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">
                        <Grid container>
                            <Grid item xs={12} lg={11} md={11} sm={11}>
                                <Typography component="span" variant="h2">
                                    <div>Record Details - {recordDetails[0].value}</div>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={1} md={1} sm={1}>
                                <DeleteForeverIcon
                                    sx={{ mr: 1.75, color: '#f44336', cursor: 'pointer' }}
                                    onClick={handleClickOpenDeleteRecordDialog('paper')}
                                />
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            {state.item.nameType.map((d, i) => {
                                if (d.data === 'Text') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField
                                                value={recordDetails[i].value}
                                                id="outlined-basic"
                                                label={`${d.name}`}
                                                variant="outlined"
                                                onChange={(e) => handleValueChange(i, e)}
                                            />
                                        </FormControl>
                                    );
                                }
                                if (d.data === 'Integer Number') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField
                                                value={recordDetails[i].value}
                                                // value={formValues[i].value}
                                                label={`${d.name}`}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                onChange={(e) => handleValueChange(i, e)}
                                            />
                                        </FormControl>
                                    );
                                }
                                if (d.data === 'Floating Point Number') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i}>
                                            <TextField
                                                value={recordDetails[i].value}
                                                // value={formValues[i].value}
                                                label={`${d.name}`}
                                                inputProps={{ inputMode: 'numeric', pattern: '([0-9]*[.])?[0-9]+' }}
                                                onChange={(e) => handleValueChange(i, e)}
                                            />
                                        </FormControl>
                                    );
                                }
                                if (d.data === 'Date') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} key={i}>
                                                <DesktopDatePicker
                                                    label={`${d.name}`}
                                                    inputFormat="MM/dd/yyyy"
                                                    value={recordDetails[i].value}
                                                    // value={formValues[i].value}
                                                    onChange={(e) => handleDateTimeChange(i, e)}
                                                    // onChange={handleDateTimeChange(i)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    );
                                }
                                if (d.data === 'Hour') {
                                    return (
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} key={i}>
                                                <TimePicker
                                                    label={`${d.name}`}
                                                    value={recordDetails[i].value}
                                                    onChange={(e) => handleTimeChange(i, e)}
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
                </Dialog>

                {/* Delete topic dialog */}
                <Dialog
                    open={openDeleteTopicDialog}
                    onClose={handleCloseDeleteTopicDialog}
                    scroll={scrollDeleteTopicDialog}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">
                        <div>
                            <Typography component="span" variant="h2">
                                <div>Delete Topic - {location.state.item.name}</div>
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            <Typography component="span" variant="h5">
                                <div>Are you sure? This action is irreversible!</div>
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteTopicDialog}>Cancel</Button>
                        <Button onClick={handleDeleteTopic}>Proceed</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete record dialog */}
                {recordSelected ? (
                    <Dialog
                        open={openDeleteRecordDialog}
                        onClose={handleCloseDeleteRecordDialog}
                        scroll={scrollDeleteRecordDialog}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">
                            <div>
                                <Typography component="span" variant="h2">
                                    <div>Delete Record - {recordSelected.typeNameRegistration[0].data}</div>
                                </Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                                <Typography component="span" variant="h5">
                                    <div>Are you sure? This action is irreversible!</div>
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteRecordDialog}>Cancel</Button>
                            <Button onClick={handleDeleteRecord}>Proceed</Button>
                        </DialogActions>
                    </Dialog>
                ) : null}
            </MainCard>
        </div>
    );
};

export default TopicRecordsPage;
