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
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import { BlockPicker, CirclePicker } from 'react-color'; /* https://casesandberg.github.io/react-color/ */
import Collapse from '@mui/material/Collapse';

// ==============================|| TYPOGRAPHY ||============================== //

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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

// const [this.formValues, setFormValues] = useState([{ name: '', fieldType: '' }]);
// const [this.topicValues, setTopicValues] = useState([{ topicName: '', topicDescription: '' }]);

class TopicRecordsPage extends React.Component {
    // TODO: capire come salvare anche il nome del topic e la descrizione

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            searchValue: '',
            show: false
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleChangeSearchValue = (event, newValue) => {
        this.setState({ searchValue: event.target.value });

        // TODO: QUA FILTRARE LA LISTA
        console.log(event.target.value);
        console.log('QUA FILTRARE LA LISTA');
    };

    handleModalClose = (event, newValue) => {
        this.setState({ show: false });
    };

    handleModalShow = (event, newValue) => {
        console.log('MOSTRO IL MODAL');
        this.setState({ show: true });
        console.log(this.state.show);
    };

    render() {
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
                                flexWrap: 'wrap',
                                paddingTop: 0
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <Typography variant="h2">NOME Topic</Typography>
                                <EditIcon className="iconColor mx-4" fontSize="medium" />
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
                                    value={this.state.searchValue || ''}
                                    onChange={this.handleChangeSearchValue}
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
                                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
                                    <Tab label="I miei NOME TOPIC" {...a11yProps(0)} />
                                    <Tab label="Performance" {...a11yProps(1)} />
                                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                                </Tabs>
                            </Box>
                            <TabPanel value={this.state.value} index={0}>
                                I miei NOME TOPIC
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
                                Performance
                            </TabPanel>
                            {/*

                            <TabPanel value={this.state.value} index={2}>
                                Item Three
                            </TabPanel>
                            
                             */}
                        </Box>
                    </div>
                    <Fab onClick={() => this.handleModalShow()} color="primary" aria-label="add" style={style}>
                        <AddIcon />
                    </Fab>
                </MainCard>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.show}
                    onClose={this.handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={this.show}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
                {/*
                                    <Modal show={this.state.show} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>TESTO MODAL</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalClose()}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
                    */}
            </>
        );
    }
}

export default TopicRecordsPage;
