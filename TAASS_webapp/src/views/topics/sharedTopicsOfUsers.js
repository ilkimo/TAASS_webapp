import React, { useEffect, useState } from 'react';

// material-ui
import { FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
import HomeSlider from '../homeNotLogged/homeSlider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import TopicCard from './topicCard';
import EarningCard from '../dashboard/Default/EarningCard';
import TotalOrderLineChartCard from '../dashboard/Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../dashboard/Default/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../dashboard/Default/TotalIncomeLightCard';
import SharedTopicCard from './sharedTopicCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
};

const fakeTopics = [
    {
        firstcolor: '#f44336',
        secondcolor: '#ff6154',
        thirdcolor: '#ff574a',
        title: 'Sport',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Data', type: 'Date' },
            { name: 'Minutes of rest', type: 'Integer Number' }
        ]
    },
    {
        firstcolor: '#2196f3',
        secondcolor: '#3fb4ff',
        thirdcolor: '#35aaff',
        title: 'Music',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Minutes of rest', type: 'Integer Number' }
        ]
    },
    {
        firstcolor: '#4caf50',
        secondcolor: '#6acd6e',
        thirdcolor: '#60c364',
        title: 'Finance',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Data', type: 'Date' }
        ]
    },
    {
        firstcolor: '#ff9800',
        secondcolor: '#ffb61e',
        thirdcolor: '#ffac14',
        title: 'Films',
        data: [{ name: 'Title', type: 'Text' }]
    },
    {
        firstcolor: '#4caf50',
        secondcolor: '#6acd6e',
        thirdcolor: '#60c364',
        title: 'Serie TVs',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Data', type: 'Date' }
        ]
    }
];

const SharedTopicsOfUsers = (props) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    /*
    const [openTopicDetails, setOpenTopicDetails] = React.useState(false);
    const [scrollTopicDetails, setScrollTopicDetails] = React.useState('paper');

    const handleClickOpenTopicDetails = (scrollType) => () => {
        console.log('APRO');
        setOpenTopicDetails(true);
        setScrollTopicDetails(scrollType);
    };

    const handleCloseTopicDetails = () => {
        setOpenTopicDetails(false);
    };
    */

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid container>
                    <Grid item xs={12} style={{ marginLeft: 20, marginTop: 20 }}>
                        <Typography variant="h2">Topics of other users</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            {fakeTopics.map((topic, i) => (
                                <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
                                    <SharedTopicCard
                                        key={i}
                                        firstcolor={topic.firstcolor}
                                        secondcolor={topic.secondcolor}
                                        thirdcolor={topic.thirdcolor}
                                        title={topic.title}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={4} md={6} sm={6} xs={12} />
                        </Grid>
                    </Grid>
                </Grid>
                <Link to="/addTopic/">
                    <Fab color="primary" aria-label="add" style={style}>
                        <AddIcon />
                    </Fab>
                </Link>
            </Grid>

            {/*
            <Dialog
                open={openTopicDetails}
                onClose={handleCloseTopicDetails}
                scroll={scrollTopicDetails}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <div>
                        <Typography component="span" variant="h2">
                            <div>Topic Details</div>
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scrollTopicDetails === 'paper'}>
                    <Grid container>
                        <Grid item xs={12} s={6} md={6} lg={6}>
                            <Typography component="span" variant="h4">
                                <div>Owner: Owner name</div>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} s={6} md={6} lg={6}>
                            <Typography component="span" variant="h4">
                                <div>Topic name: topic name</div>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Typography component="span" variant="body1">
                            <div>Topic has this structure:</div>
                        </Typography>
                    </Grid>
                </DialogContent>
            </Dialog>
            */}
        </>
    );
};

export default SharedTopicsOfUsers;
