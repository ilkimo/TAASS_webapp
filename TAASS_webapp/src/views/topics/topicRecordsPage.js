// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { TextField, FormControl, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconNotebook } from '@tabler/icons';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Row, Col, Container } from 'react-bootstrap';
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
            searchValue: ''
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

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2'
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        };
        const circleColorPickerStyle = {
            width: '25px',
            height: '25px',
            background: this.state.background,
            border: '3px solid {this.state.background}',
            borderRadius: '50%',
            marginRight: 3
        };
        const firstCircleColorPickerStyle = {
            width: '25px',
            height: '25px',
            background: this.state.firstDarkBackground,
            border: '3px solid {this.state.firstDarkBackground}',
            borderRadius: '50%',
            marginRight: 3
        };
        const secondCircleColorPickerStyle = {
            width: '25px',
            height: '25px',
            background: this.state.secondDarkBackground,
            border: '3px solid {this.state.secondDarkBackground}',
            borderRadius: '50%',
            marginRight: 3
        };

        return (
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
                <Fab onClick={() => this.addFormFields()} color="primary" aria-label="add" style={style}>
                    <AddIcon />
                </Fab>
            </MainCard>
        );
    }
}

export default TopicRecordsPage;
