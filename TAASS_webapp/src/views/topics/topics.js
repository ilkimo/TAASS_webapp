import { useEffect, useState } from 'react';

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
    { firstColor: '#f44336', secondColor: '#ff6154', thirdColor: '#ff574a', title: 'Sport' },
    { firstColor: '#2196f3', secondColor: '#3fb4ff', thirdColor: '#35aaff', title: 'Music' },
    { firstColor: '#4caf50', secondColor: '#6acd6e', thirdColor: '#60c364', title: 'Finance' },
    { firstColor: '#ff9800', secondColor: '#ffb61e', thirdColor: '#ffac14', title: 'Films' },
    { firstColor: '#4caf50', secondColor: '#6acd6e', thirdColor: '#60c364', title: 'Serie TVs' },
    { firstColor: '#f44336', secondColor: '#ff6154', thirdColor: '#ff574a', title: 'Books' },
    { firstColor: '#2196f3', secondColor: '#3fb4ff', thirdColor: '#35aaff', title: 'Food' }
];

const Topics = (props) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            {/* <HomeSlider /> */}

            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        {fakeTopics.map((topic, i) => (
                            <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
                                <Link
                                    to={{
                                        pathname: '/topicRecordsPage/',
                                        state: {
                                            item: topic
                                        }
                                    }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <TopicCard
                                        key={i}
                                        firstColor={topic.firstColor}
                                        secondColor={topic.secondColor}
                                        thirdColor={topic.secondColor}
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
