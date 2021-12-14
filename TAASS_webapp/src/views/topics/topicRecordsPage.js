// project imports
import MainCard from 'ui-component/cards/MainCard';
import { TextField, FormControl, Divider, Modal } from '@mui/material';
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
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { forEach } from 'react-bootstrap/ElementChildren';
import TopicCard from './topicCard';
import TopicRecordCard from './topicRecordCard';

/* Test histogram */
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { Bar } from 'react-chartjs-2';

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TopicRecordsPage = (props) => {
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [show, setShow] = useState(false);

    const [theArray, setTheArray] = useState([]);

    const [recordDetails, setRecordDetails] = useState([]);

    const location = useLocation();

    const params = useParams();

    const state = location.state;

    const [topicName, setTopicName] = useState([state.item.title]);

    const formValues = [];

    if (theArray.length === 0) {
        state.item.data.forEach((element) => {
            if (element.type === 'Text') {
                theArray.push({ value: 'initial value' });
            } else if (element.type === 'Integer Number') {
                theArray.push({ value: 9 });
            } else if (element.type === 'Date') {
                theArray.push({ value: new Date() });
            }

            if (element.type === 'Text') {
                recordDetails.push({ value: '' });
            } else if (element.type === 'Integer Number') {
                recordDetails.push({ value: 0 });
            } else if (element.type === 'Date') {
                recordDetails.push({ value: new Date() });
            }

            // console.log(element.name);
            console.log(theArray);
            console.log(recordDetails);
        });
    }

    /* TODO: costruire questa struttura andando a contare quanti record sono stati inseriti in ogni mese */
    const data = {
        labels,
        datasets: [
            {
                label: `I miei ${state.item.title}`,
                data: [10, 20, 30, 40, 50, 60, 0, 0, 0, 0, 0, 2],
                backgroundColor: location.state.item.thirdcolor
            }
        ]
    };

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

    /**/
    const [openRecordDetails, setOpenRecordDetails] = React.useState(false);
    const [scrollRecordDetails, setScrollRecordDetails] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenRecord = (scrollType, record) => () => {
        for (let i = 0; i < recordDetails.length; i += 1) {
            recordDetails[i].value = record.values[i];
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

    const handleDialogSubmit = () => {
        console.log('VALORI INSERITI: ');
        console.log(theArray);

        // setOpen(false);
    };

    /* Edit Topic Name */
    const [openEditTopic, setOpenEditTopic] = React.useState(false);
    const [scrollEditTopic, setScrollEditTopic] = React.useState('paper');

    const handleClickOpenEditTopic = (scrollType) => () => {
        setOpenEditTopic(true);
        setScrollEditTopic(scrollType);
    };

    const handleCloseEditTopic = () => {
        setOpenEditTopic(false);
    };

    const handleDialogEditTopicSubmit = () => {
        console.log(`TOPIC MODIFICATO - nuovo nome: ${topicName}`);

        console.log('STATE');
        console.log(location.state);

        console.log('ITEM');
        console.log(location.state.item);

        // location.state.item.nameChangeHandler(0, location.state.item.title, topicName);

        location.state.item.title = topicName;
        setOpenEditTopic(false);

        /* Bisogna capire come modificare il valore anche per quanto riguarda l'oggetto che ha il component padre */
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

    const handleDateTimeChange = (i, newValue) => {
        let newFormValues = [...theArray];
        newFormValues[i].value = newValue;

        setTheArray(newFormValues);
    };

    return (
        <div>
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
                            <EditIcon
                                className="iconColor mx-4"
                                fontSize="medium"
                                style={{ fill: location.state.item.firstcolor, cursor: 'pointer' }}
                                onClick={handleClickOpenEditTopic('paper')}
                            />
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
                            {/* I miei {location.state.item.title} */}

                            {state.item.records.length > 0
                                ? state.item.records.map((record, i) => (
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
                                              firstcolor={state.item.firstcolor}
                                              secondcolor={state.item.secondcolor}
                                              thirdcolor={state.item.thirdcolor}
                                              title={record.values[0]}
                                              date={record.values[1]}
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
                    open={openEditTopic}
                    onClose={handleCloseEditTopic}
                    scroll={scrollEditTopic}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">
                        <div>
                            <Typography component="span" variant="h2">
                                <div>Edit Topic - {state.item.title}</div>
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
                                <div>Add Record - {state.item.title}</div>
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            {state.item.data.map((d, i) => {
                                if (d.type === 'Text') {
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
                                if (d.type === 'Integer Number') {
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
                                if (d.type === 'Date') {
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
                        <div>
                            <Typography component="span" variant="h2">
                                <div>Record Details - {recordDetails[0].value}</div>
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            {state.item.data.map((d, i) => {
                                if (d.type === 'Text') {
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
                                if (d.type === 'Integer Number') {
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
                                if (d.type === 'Date') {
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
                                return <FormControl fullWidth sx={{ mb: 2 }} variant="filled" key={i} />;
                            })}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </MainCard>
        </div>
    );
};

export default TopicRecordsPage;
