import MuiTypography from '@mui/material/Typography';

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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { BlockPicker, CirclePicker } from 'react-color'; /* https://casesandberg.github.io/react-color/ */
import Collapse from '@mui/material/Collapse';

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
            firstDarkbackground: '#f44336',
            secondDarkbackground: '#f44336',
            formValues: [{ name: '', fieldType: '' }],
            topicValues: [{ topicName: '', topicDescription: '' }],
            displayColorPicker: false
        };
    }

    handleChange = (i, e) => {
        let newFormValues = [...this.state.formValues];
        newFormValues[i][e.target.name] = e.target.value;

        this.setState({ formValues: newFormValues });
    };

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });

        console.log(color.hex);
        console.log(this.lightDarkColor(color.hex.substring(1), -10));
        console.log(this.lightDarkColor(color.hex.substring(1), -20));

        this.setState({ firstDarkBackground: `#${this.lightDarkColor(color.hex, -10)}` });
        this.setState({ secondDarkBackground: '#{this.lightDarkColor(color.hex, -20)}' });

        console.log(this.state.firstDarkBackground);
        console.log(this.state.secondDarkBackground);
    };

    addFormFields = () => {
        let newFormValues = [...this.state.formValues, { name: '', fieldType: '' }];
        this.setState({ formValues: newFormValues });
    };

    removeFormFields = (i) => {
        let newFormValues = [...this.state.formValues];
        newFormValues.splice(i, 1);
        // setFormValues(newFormValues);
        this.setState({ formValues: newFormValues });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(this.state.formValues));
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
        let num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        let b = ((num >> 8) & 0x00ff) + amt;
        let g = (num & 0x0000ff) + amt;
        let newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
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
            borderRadius: '50%'
        };
        const firstCircleColorPickerStyle = {
            width: '25px',
            height: '25px',
            background: this.state.firstDarkBackground,
            border: '3px solid {this.state.background}',
            borderRadius: '50%'
        };
        const secondCircleColorPickerStyle = {
            width: '25px',
            height: '25px',
            background: this.state.secondDarkBackground,
            border: '3px solid {this.state.background}',
            borderRadius: '50%'
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
                    <MuiTypography variant="h2">Add Topic</MuiTypography>
                    <IconNotebook className="iconColor mx-4" fontSize="medium" />
                </div>

                <div className="pageStyle">
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4} md={4} sm={12}>
                            <MuiTypography variant="h4">What is the form of your data?</MuiTypography>
                            <MuiTypography variant="body2" gutterBottom>
                                Please press the plkus button to add a field you want to save of your data and press the Done Button when
                                tou finish.
                            </MuiTypography>
                            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} variant="filled">
                                <TextField id="outlined-basic" label="Topic Name" variant="outlined" name="name" size="small" />
                                <TextField
                                    sx={{ mt: 2 }}
                                    id="filled-multiline-static"
                                    label="Topic Description"
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="filled"
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
                                    <div key={index}>
                                        <Grid container spacing={3} alignItems="center" justify="center">
                                            <Grid item xs={12} lg={5} md={5} sm={5}>
                                                <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} variant="filled" key={index}>
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
                                                <FormControl fullWidth sx={{ m: 1 }} variant="filled" key={index}>
                                                    <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                                                    <Select
                                                        label="Field Type"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name="fieldType"
                                                        size="small"
                                                        value={element.fieldType || ''}
                                                        onChange={(e) => this.handleChange(index, e)}
                                                    >
                                                        <MenuItem value="Text">Text</MenuItem>
                                                        <MenuItem value="Integer Number">Integer Number</MenuItem>
                                                        <MenuItem value="Floating Point Number">Floating Point Number</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            {index ? (
                                                <Grid item xs={12} lg={2} md={2} sm={2}>
                                                    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} variant="filled" key={index}>
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
                                            ) : null}
                                        </Grid>
                                        <Divider />
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
