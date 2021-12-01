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

const AddTopic = () => {
    const [formValues, setFormValues] = useState([{ name: '', fieldType: '' }]);
    const [topicValues, setTopicValues] = useState([{ topicName: '', topicDescription: '' }]);

    // TODO: capire come salvare anche il nome del topic e la descrizione

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);

        /*
        let newTopicValues = [...formValues];
        setTopicValues(newTopicValues);
         */
    };

    let addFormFields = () => {
        setFormValues([...formValues, { name: '', fieldType: '' }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
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
                            Please press the plkus button to add a field you want to save of your data and press the Done Button when tou
                            finish.
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
                    </Grid>
                    <Grid item xs={12} lg={8} md={8} sm={12}>
                        <form onSubmit={handleSubmit}>
                            {formValues.map((element, index) => (
                                <div>
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
                                                    onChange={(e) => handleChange(index, e)}
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
                                                    onChange={(e) => handleChange(index, e)}
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
                                                        onClick={() => removeFormFields(index)}
                                                        size="small"
                                                        color="primary"
                                                        aria-label="add"
                                                        style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}
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
            <Fab onClick={() => addFormFields()} color="primary" aria-label="add" style={style}>
                <AddIcon />
            </Fab>
        </MainCard>
    );
};

export default AddTopic;
