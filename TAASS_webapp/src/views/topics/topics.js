import React, { useEffect, useState } from 'react';

// material-ui
import { FormControl, Grid } from '@mui/material';

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
import MuiTypography from '@mui/material/Typography';

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
        ],
        records: [
            { values: ['Allenamento 1', '12-12-2021', 30] },
            { values: ['Allenamento 2', '12-16-2021', 10] },
            { values: ['Allenamento 3', '12-11-2021', 20] },
            { values: ['Allenamento 4', '12-10-2021', 40] }
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
        ],
        records: []
    },
    {
        firstcolor: '#4caf50',
        secondcolor: '#6acd6e',
        thirdcolor: '#60c364',
        title: 'Finance',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Data', type: 'Date' }
        ],
        records: []
    },
    {
        firstcolor: '#ff9800',
        secondcolor: '#ffb61e',
        thirdcolor: '#ffac14',
        title: 'Films',
        data: [{ name: 'Title', type: 'Text' }],
        records: []
    },
    {
        firstcolor: '#4caf50',
        secondcolor: '#6acd6e',
        thirdcolor: '#60c364',
        title: 'Serie TVs',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Data', type: 'Date' }
        ],
        records: []
    },
    {
        firstcolor: '#f44336',
        secondcolor: '#ff6154',
        thirdcolor: '#ff574a',
        title: 'Books',
        data: [
            { name: 'Data', type: 'Date' },
            { name: 'Minutes of rest', type: 'Integer Number' }
        ],
        records: []
    },
    {
        firstcolor: '#2196f3',
        secondcolor: '#3fb4ff',
        thirdcolor: '#35aaff',
        title: 'Food',
        data: [
            { name: 'Title', type: 'Text' },
            { name: 'Minutes of rest', type: 'Integer Number' }
        ],
        records: []
    }
];

const changeTopicNameHandler = (index, oldName, newName) => {
    fakeTopics[index].title = newName;
};

const Topics = (props) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            {/* <HomeSlider /> */}

            <Grid container>
                <Grid item xs={12} style={{ marginLeft: 20, marginTop: 20 }}>
                    <MuiTypography variant="h2">Your Topics</MuiTypography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {fakeTopics.map((topic, i) => (
                            <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
                                <Link
                                    to={{
                                        pathname: '/topicRecordsPage/'
                                        /*
                                        state: {
                                            item: topic,
                                            handlerNameChange: changeTopicNameHandler
                                        }
                                      
                                         */
                                    }}
                                    state={{ item: topic }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <TopicCard
                                        key={i}
                                        firstcolor={topic.firstcolor}
                                        secondcolor={topic.secondcolor}
                                        thirdcolor={topic.thirdcolor}
                                        title={topic.title}
                                    />
                                </Link>
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
    );
};

export default Topics;
