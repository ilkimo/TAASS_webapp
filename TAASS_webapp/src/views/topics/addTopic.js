import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { TextField, FormControl, Divider, IconButton } from '@mui/material';
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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { BlockPicker, CirclePicker } from 'react-color'; /* https://casesandberg.github.io/react-color/ */
import Collapse from '@mui/material/Collapse';
import { ReactSession } from 'react-client-session';
import * as $ from 'jquery';
import { useNavigate, withRouter, BrowserRouter, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert } from '@mui/lab';
import { getSession } from 'react-session-persist/lib';

// ==============================|| TYPOGRAPHY ||============================== //

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

class AddTopic extends React.Component {
    // TODO: capire come salvare anche il nome del topic e la descrizione

    constructor(props) {
        super(props);

        this.state = {
            background: '#f44336',
            firstDarkBackground: '#ea392c',
            secondDarkBackground: '#e02f22',
            formValues: [
                { name: 'Name', data: 'Text' },
                { name: 'Date', data: 'Date' }
            ],
            topicValues: [{ topicName: '', topicDescription: '' }],
            displayColorPicker: false,
            topicName: '',
            topicDescription: '',
            alert: false,
            alertError: false,
            alertCompileAllForm: false
        };
    }

    handleChange = (i, e) => {
        let newFormValues = [...this.state.formValues];
        newFormValues[i][e.target.name] = e.target.value;

        this.setState({ formValues: newFormValues });
    };

    handleTopicNameChange = (e) => {
        this.setState({ topicName: e.target.value });
    };

    handleTopicDescriptionChange = (e) => {
        this.setState({ topicDescription: e.target.value });
    };

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });

        console.log(color.hex);
        let firstcolor = this.lightDarkColor(color.hex.substring(1), +30);
        let secondcolor = this.lightDarkColor(color.hex.substring(1), +20);

        this.setState({ firstDarkBackground: `#${firstcolor}` });
        this.setState({ secondDarkBackground: `#${secondcolor}` });

        console.log(this.state.background);
        console.log(this.state.firstDarkBackground);
        console.log(this.state.secondDarkBackground);
    };

    addFormFields = () => {
        let newFormValues = [...this.state.formValues, { name: '', data: '' }];
        this.setState({ formValues: newFormValues });
    };

    removeFormFields = (i) => {
        let newFormValues = [...this.state.formValues];
        newFormValues.splice(i, 1);
        // setFormValues(newFormValues);
        this.setState({ formValues: newFormValues });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // alert(`${this.state.topicName}; ${this.state.topicDescription}`);
        // alert(JSON.stringify(this.state.formValues));

        let formOk = true;

        /* Controllare tutti i dati! Ogni valore deve essere stato inserito */
        if (this.state.topicName.replace(/\s/g, '').length > 0 && this.state.topicDescription.replace(/\s/g, '').length > 0) {
            this.state.formValues.forEach((elem) => {
                if (elem.name.replace(/\s/g, '').length === 0 || elem.data.replace(/\s/g, '').length === 0) {
                    this.setState({ alertCompileAllForm: true });
                    formOk = false;
                }
            });
        } else {
            this.setState({ alertCompileAllForm: true });
            formOk = false;
        }

        // let navigate = useNavigate();

        /* TODO: make query */

        // navigate('/topics', { replace: true });

        const session = await getSession();
        console.log(session);

        if (formOk) {
            let topic = {
                id: String(session.user.id),
                name: this.state.topicName,
                description: this.state.topicDescription,
                nameType: this.state.formValues,
                color: [this.state.background, this.state.firstDarkBackground, this.state.secondDarkBackground]
            };

            console.log(topic);

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/v2/data/newTopic',
                data: JSON.stringify(topic),
                contentType: 'application/json;charset=utf-8'
            })
                .done((response) => {
                    console.log('RESPONSE');
                    console.log(response);
                    // this.props.navigation.navigate('nextScreen');
                    // this.props.navigate('/topics');
                    // this.props.history.push('/topics');

                    this.setState({ alert: true });
                    this.setState({
                        background: '#f44336',
                        firstDarkBackground: '#ea392c',
                        secondDarkBackground: '#e02f22',
                        formValues: [
                            { name: 'Name', data: 'Text' },
                            { name: 'Date', data: 'Date' }
                        ],
                        topicValues: [{ topicName: '', topicDescription: '' }],
                        displayColorPicker: false,
                        topicName: '',
                        topicDescription: '',
                        alertError: false
                    });
                })
                .fail((e, s, t) => {
                    console.log(`Failed: ${e.responseText}`);
                    this.setState({ alertError: true, alert: false });
                });
        }
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    /*
        handleClose = () => {
        this.setState({ displayColorPicker: false });
    };
     */

    // colore, percentuale
    lightDarkColor = (col, amt) => {
        let usePound = false;

        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }

        let num = parseInt(col, 16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00ff) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000ff) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
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
                        <ArrowBackIcon className="iconColor mr-4" fontSize="medium" style={{ marginRight: '20' }} />
                    </Link>
                    <MuiTypography variant="h2">Add Topic</MuiTypography>
                    <IconNotebook className="iconColor mx-4" fontSize="medium" />
                </div>
                <div>
                    <Collapse in={this.state.alert}>
                        <Alert
                            variant="filled"
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setState({ alert: false });
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, mt: 2 }}
                        >
                            Topic added!
                        </Alert>
                    </Collapse>
                    <Collapse in={this.state.alertError}>
                        <Alert
                            variant="filled"
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setState({ alertError: false });
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, mt: 2 }}
                        >
                            Topic name already exists!
                        </Alert>
                    </Collapse>
                    <Collapse in={this.state.alertCompileAllForm}>
                        <Alert
                            variant="filled"
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setState({ alertCompileAllForm: false });
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
                <div className="pageStyle">
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4} md={4} sm={12}>
                            <MuiTypography variant="h4">What is the form of your data?</MuiTypography>
                            <MuiTypography variant="body2" gutterBottom>
                                Please press the plis button to add a field you want to save of your data and press the Done Button when tou
                                finish.
                            </MuiTypography>
                            <FormControl fullWidth sx={{ mt: 1, mb: 2 }} variant="filled">
                                <TextField
                                    id="outlined-basic"
                                    label="Topic Name"
                                    variant="outlined"
                                    name="name"
                                    size="small"
                                    value={this.state.topicName || ''}
                                    onChange={this.handleTopicNameChange}
                                />
                                <TextField
                                    sx={{ mt: 2 }}
                                    id="filled-multiline-static"
                                    label="Topic Description"
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="filled"
                                    value={this.state.topicDescription || ''}
                                    onChange={this.handleTopicDescriptionChange}
                                />
                            </FormControl>
                            <div>
                                <div className="rowC">
                                    <Button onClick={this.handleClick} sx={{ mr: 2 }} color="primary" variant="contained">
                                        Pick Color
                                    </Button>
                                    <div style={circleColorPickerStyle} />
                                    <div style={firstCircleColorPickerStyle} />
                                    <div style={secondCircleColorPickerStyle} />
                                </div>

                                <Collapse in={this.state.displayColorPicker} sx={{ mt: 2 }}>
                                    <CirclePicker color={this.state.background} onChangeComplete={this.handleChangeComplete} />
                                </Collapse>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={8} md={8} sm={12}>
                            <form onSubmit={this.handleSubmit}>
                                {this.state.formValues.map((element, index) => (
                                    <div key={index} style={{ marginBottom: 10 }}>
                                        {index <= 1 ? (
                                            <Grid container spacing={3} alignItems="center" justify="center">
                                                <Grid item xs={12} lg={5} md={5} sm={5}>
                                                    <FormControl fullWidth sx={{ m: 0 }} variant="filled" key={index}>
                                                        <TextField
                                                            disabled
                                                            id="outlined-basic"
                                                            label="Field Name"
                                                            variant="outlined"
                                                            value={element.name || ''}
                                                            name="name"
                                                            size="small"
                                                            onChange={(e) => this.handleChange(index, e)}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} lg={5} md={5} sm={5}>
                                                    <FormControl fullWidth sx={{ m: 0 }} variant="filled" key={index}>
                                                        <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                                                        <Select
                                                            disabled
                                                            label="Field Type"
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="data"
                                                            size="small"
                                                            value={element.data || ''}
                                                            onChange={(e) => this.handleChange(index, e)}
                                                        >
                                                            <MenuItem value="Text">Text</MenuItem>
                                                            <MenuItem value="Integer Number">Integer Number</MenuItem>
                                                            <MenuItem value="Floating Point Number">Floating Point Number</MenuItem>
                                                            <MenuItem value="Date">Date</MenuItem>
                                                            <MenuItem value="Hour">Hour</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ) : null}

                                        {index > 1 ? (
                                            <Grid container spacing={3} alignItems="center" justify="center">
                                                <Grid item xs={12} lg={5} md={5} sm={5}>
                                                    <FormControl fullWidth sx={{ m: 0 }} variant="filled" key={index}>
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Field Name"
                                                            variant="outlined"
                                                            value={element.name || ''}
                                                            name="name"
                                                            size="small"
                                                            onChange={(e) => this.handleChange(index, e)}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} lg={5} md={5} sm={5}>
                                                    <FormControl fullWidth sx={{ m: 0 }} variant="filled" key={index}>
                                                        <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                                                        <Select
                                                            label="Field Type"
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="data"
                                                            size="small"
                                                            value={element.data || ''}
                                                            onChange={(e) => this.handleChange(index, e)}
                                                        >
                                                            <MenuItem value="Text">Text</MenuItem>
                                                            <MenuItem value="Integer Number">Integer Number</MenuItem>
                                                            <MenuItem value="Floating Point Number">Floating Point Number</MenuItem>
                                                            <MenuItem value="Date">Date</MenuItem>
                                                            <MenuItem value="Hour">Hour</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} lg={2} md={2} sm={2}>
                                                    <FormControl fullWidth sx={{ m: 0 }} variant="filled" key={index}>
                                                        <Fab
                                                            onClick={() => this.removeFormFields(index)}
                                                            size="small"
                                                            color="primary"
                                                            aria-label="add"
                                                            style={{
                                                                display: 'flex',
                                                                textAlign: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </Fab>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ) : null}
                                        <Divider sx={{ mt: 2 }} />
                                    </div>
                                ))}
                                <div className="button-section">
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </div>
                <Fab onClick={() => this.addFormFields()} color="primary" aria-label="add" style={style}>
                    <AddIcon />
                </Fab>
            </MainCard>
        );
    }
}

export default AddTopic;
