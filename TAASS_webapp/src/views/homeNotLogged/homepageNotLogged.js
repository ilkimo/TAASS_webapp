import React from 'react';
// nodejs library that concatenates classes

// react components for routing our app without refresh

// @material-ui/core components

// @material-ui/icons
// core components

import Header from '../../layout/MainLayout/Header';
import HomeSlider from './homeSlider';
import MuiTypography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Col, Container, Navbar, Row, Form } from 'react-bootstrap';
import { Button, Fab, FormControl, Grid, TextField } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import TopicCardHomepageV2 from '../topics/topicCardHomepageV2';
import SubCard from '../../ui-component/cards/SubCard';
import { useNavigate } from 'react-router-dom';
import * as $ from 'jquery';
import 'jquery.soap';

import { ReactSession } from 'react-client-session';

export default function HomepageNotLogged(props) {
    const { ...rest } = props;
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Login');

        /* TODO: qua bisogna gestire il logout */
        /* GESTIRE LA SESSIONE UTENTE */

        navigate('../pages/login/login3', { replace: false });
    };

    const testUserSession = async () => {
        console.log('Test user session pressed');

        let user = {
            name: null,
            surname: null,
            email: '',
            password: ''
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/v1/users/session',
            data: JSON.stringify(user),
            contentType: 'application/json;charset=utf-8'
        })
            .done(() => {
                console.log('OK');

                // navigate('/topics', { replace: false });
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });

        /*
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/v1/users/login',
            data: JSON.stringify(null),
            contentType: 'application/json;charset=utf-8'
        })
            .done(() => {
                console.log('User session exists');

                // navigate('/topics', { replace: false });
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });

         */
    };

    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand>
                        <MuiTypography variant="h2">DATAHUB</MuiTypography>
                    </Navbar.Brand>
                    <Navbar.Collapse
                        className="justify-content-end"
                        style={{
                            backgroundColor: 'white'
                        }}
                    >
                        {/*
                        <Fab onClick={testUserSession} variant="extended" color="primary" style={{ zIndex: 10 }}>
                            Test User session
                        </Fab>
                        */}
                        <Fab onClick={handleLogin} variant="extended" color="primary" style={{ zIndex: 10 }}>
                            Login
                        </Fab>

                        {/*
                                <Button onClick={handleLogin} variant="contained">
                            Contained
                        </Button>
                                */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <div>
                    <div className="box">
                        <HomeSlider />
                        <HomeSlider />
                    </div>
                    <div className="box-inside stack-top">
                        <MainCard
                            style={{
                                backgroundColor: 'white'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <MuiTypography variant="h2">DATAHUB</MuiTypography>
                            </div>

                            <Grid container>
                                <Grid item xs={12} md={6} lg={4}>
                                    <div className="parent">
                                        <div className="child1">
                                            <TopicCardHomepageV2
                                                firstcolor="#f44336"
                                                secondcolor="#ff6154"
                                                thirdcolor="#ff574a"
                                                title="Music"
                                            />
                                        </div>
                                        <div className="child1 child2">
                                            <TopicCardHomepageV2
                                                firstcolor="#2196f3"
                                                secondcolor="#3fb4ff"
                                                thirdcolor="#35aaff"
                                                title="Films"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} lg={8}>
                                    <SubCard title="DATAHUB is awesome!">
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <MuiTypography variant="body1" gutterBottom>
                                                    body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde
                                                    suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                                </MuiTypography>
                                            </Grid>
                                            <Grid item>
                                                <MuiTypography variant="body2" gutterBottom>
                                                    body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde
                                                    suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                                </MuiTypography>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: 20 }}>
                                <Grid item xs={12} md={6} lg={8}>
                                    <SubCard title="DATAHUB is awesome!">
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <MuiTypography variant="body1" gutterBottom>
                                                    body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde
                                                    suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                                </MuiTypography>
                                            </Grid>
                                            <Grid item>
                                                <MuiTypography variant="body2" gutterBottom>
                                                    body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde
                                                    suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                                </MuiTypography>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{ paddingLeft: '3%' }}>
                                    <div className="parent">
                                        <div className="child1">
                                            <TopicCardHomepageV2
                                                firstcolor="#4caf50"
                                                secondcolor="#6acd6e"
                                                thirdcolor="#60c364"
                                                title="Finance"
                                            />
                                        </div>
                                        <div className="child1 child2">
                                            <TopicCardHomepageV2
                                                firstcolor="#ff9800"
                                                secondcolor="#ffb61e"
                                                thirdcolor="#ffac14"
                                                title="Serie TVs"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </div>
                </div>
                {/*
                <div className="parallax-container">
                    <div className="parallax">
                        <HomeSlider />
                    </div>
                </div>
                <div>
                    <div>
                        <h1>Why should you use DataHUB?</h1>
                        <h3>DataHUB is awesome.</h3>
                    </div>

                    <HomeSlider />
                </div> */}
            </main>
        </div>
    );
}
