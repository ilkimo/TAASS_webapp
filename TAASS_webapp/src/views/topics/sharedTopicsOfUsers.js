import React from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import SharedTopicCard from './sharedTopicCard';
import Typography from '@mui/material/Typography';
import { getSession } from 'react-session-persist/lib';
import * as $ from 'jquery';
import { backendUrl } from '../../utils/utils';

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

class SharedTopicsOfUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            sharedTopics: null
        };
        this.getSharedTopics = this.getSharedTopics.bind(this);
    }

    componentDidMount() {
        this.getSharedTopics();
    }

    async getSharedTopics() {
        const session = await getSession();
        console.log(session);

        const setState = this.setState.bind(this);
        $.ajax({
            type: 'POST',
            url: `${backendUrl}sharedTopic`,
            data: String(session.user.id),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);

                let objResponse = JSON.parse(response);

                // this.state.topics = response;
                setState({ sharedTopics: objResponse.sharedTopicList });

                console.log('userObject');
                console.log(this.state.sharedTopics);
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });
    }

    render() {
        if (this.state.sharedTopics) {
            return (
                <>
                    <Grid container spacing={gridSpacing}>
                        <Grid container>
                            <Grid item xs={12} style={{ marginLeft: 20, marginTop: 20 }}>
                                <Typography variant="h2">Topics of other users</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    {this.state.sharedTopics.map((topic, i) => (
                                        <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
                                            <SharedTopicCard
                                                key={i}
                                                firstcolor={topic.color[0]}
                                                secondcolor={topic.color[1]}
                                                thirdcolor={topic.color[2]}
                                                title={topic.name}
                                                creationDate={topic.creationDate}
                                                topic={topic}
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
                </>
            );
        }

        return (
            <div>
                <Typography variant="h3">There are not topic yet</Typography>
                <Link to="/addTopic/">
                    <Fab color="primary" aria-label="add" style={style}>
                        <AddIcon />
                    </Fab>
                </Link>
            </div>
        );
    }
}

export default SharedTopicsOfUsers;
