import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, FormControl, Grid, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import * as $ from 'jquery';
import { getSession } from 'react-session-persist/lib';
import DialogContentText from '@mui/material/DialogContentText';
import Collapse from '@mui/material/Collapse';
import { Alert } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

const CardWrapper = styled(MainCard)(({ theme, firstcolor, secondcolor, thirdcolor }) => ({
    // backgroundColor: theme.palette.secondary.dark,
    backgroundColor: firstcolor,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 20,
    marginLeft: 20,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        // background: theme.palette.secondary[800],
        background: secondcolor,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        // background: theme.palette.secondary[800],
        background: thirdcolor,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

CardWrapper.propTypes = {
    firstcolor: PropTypes.string,
    secondcolor: PropTypes.string,
    thirdcolor: PropTypes.string
};

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const SharedTopicCard = ({ isLoading, firstcolor, secondcolor, thirdcolor, title, creationDate, topic }) => {
    /*

    console.log('Props in Input :', firstcolor);
    console.log('Props in Input :', secondcolor);
    console.log('Props in Input :', thirdcolor);

     */

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    /* Edit Topic Name */
    const [openSetTopicName, setOpenSetTopicName] = React.useState(false);
    const [scrollSetTopicName, setScrollSetTopicName] = React.useState('paper');

    const [newName, setNewName] = React.useState('');

    const [topicNameChanged, setTopicNameChanged] = React.useState(false);
    const [topicNameChangedError, setTopicNameChangedError] = React.useState(false);

    /* Topic details */
    const [openTopicDetails, setOpenTopicDetails] = React.useState(false);
    const [scrollTopicDetails, setScrollTopicDetails] = React.useState('paper');

    const [topicNameError, setTopicNameError] = React.useState(false);

    const [topicCloned, setTopicCloned] = React.useState(false);

    const handleClickOpenSetTopicName = (scrollType) => () => {
        setOpenSetTopicName(true);
        setScrollSetTopicName(scrollType);
    };

    const handleCloseSetTopicName = () => {
        setOpenSetTopicName(false);
    };

    const handleTopicNameChange = (event, newValue) => {
        setNewName(event.target.value);
    };

    const handleDialogSetTopicNameSubmit = async () => {
        // query

        const session = await getSession();
        console.log(session);

        let top = {
            id: String(session.user.id),
            name: newName,
            description: topic.description,
            nameType: topic.nameType,
            color: [topic.color[0], topic.color[1], topic.color[2]]
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/gateway/newTopic',
            data: JSON.stringify(top),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);
                // this.props.navigation.navigate('nextScreen');
                // this.props.navigate('/topics');
                // this.props.history.push('/topics');

                setOpenSetTopicName(false);
                // setOpenTopicDetails(false);

                setTopicCloned(true);

                setTopicNameError(false);
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
                setTopicCloned(false);
                setTopicNameError(true);
            });
    };

    const handleClickOpenTopicDetails = (scrollType) => () => {
        console.log('APRO');
        setAnchorEl(false);
        setOpenTopicDetails(true);
        setScrollTopicDetails(scrollType);
    };

    const handleCloseTopicDetails = () => {
        setOpenTopicDetails(false);
    };

    const handleCloneTopic = () => {
        console.log('CLONO IL TOPIC');
        setOpenSetTopicName(true);

        /*
        // query

        const session = await getSession();
        console.log(session);

        let top = {
            id: String(session.user.id),
            name: 'Nuovo topic',
            description: topic.description,
            nameType: topic.nameType,
            color: [topic.color[0], topic.color[1], topic.color[2]]
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/v2/data/newTopic',
            data: JSON.stringify(top),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);
                // this.props.navigation.navigate('nextScreen');
                // this.props.navigate('/topics');
                // this.props.history.push('/topics');
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
            });

         */
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <>
                    <CardWrapper
                        className="zoom"
                        sx={{ height: 150 }}
                        border={false}
                        content={false}
                        firstcolor={firstcolor}
                        secondcolor={secondcolor}
                        thirdcolor={thirdcolor}
                        onClick={handleClickOpenTopicDetails('paper')}
                    >
                        <Box sx={{ pt: 2.25, px: 2.25 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography sx={{ fontSize: '1.725rem', fontWeight: 500, mr: 1, mt: 0.75 }}>{title}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container>
                                        <Grid item>
                                            <Typography sx={{ fontSize: '1.025rem', fontWeight: 500, mr: 1, mt: 4.75 }}>
                                                <i>
                                                    Creation date: {creationDate.day}/{creationDate.month}/{creationDate.year}
                                                </i>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardWrapper>

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
                            <Collapse in={topicCloned}>
                                <Alert
                                    variant="filled"
                                    severity="success"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setTopicCloned(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2, mt: 2 }}
                                >
                                    Topic cloned!
                                </Alert>
                            </Collapse>
                            <Grid container>
                                {/*
                                <Grid item xs={12} s={6} md={6} lg={6}>
                                    <Typography component="span" variant="h4">
                                        <div>Owner: Owner name</div>
                                    </Typography>
                                </Grid>
                                */}
                                <Grid item xs={12} s={12} md={12} lg={12}>
                                    <Typography component="span" variant="h4">
                                        <div>Topic name: {topic.name}</div>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mt: 3 }}>
                                <Typography component="span" variant="body1">
                                    <div>Topic has this structure:</div>
                                    {topic.nameType.map((nameType, i) => (
                                        <Typography component="span" variant="body1">
                                            <b>{nameType.name}</b>: {nameType.data}
                                            <br />
                                        </Typography>
                                    ))}
                                </Typography>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseTopicDetails}>Cancel</Button>
                            <Button onClick={handleCloneTopic}>Clone</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Set topic name */}
                    <Dialog
                        open={openSetTopicName}
                        onClose={handleCloseSetTopicName}
                        scroll={scrollSetTopicName}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">
                            <div>
                                <Typography component="span" variant="h2">
                                    <div>Set topic name</div>
                                </Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent dividers={scrollSetTopicName === 'paper'}>
                            <Collapse in={topicNameError}>
                                <Alert
                                    variant="filled"
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setTopicNameError(false);
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
                            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                                <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                    <TextField
                                        value={newName}
                                        id="outlined-basic"
                                        label="Topic name"
                                        variant="outlined"
                                        onChange={handleTopicNameChange}
                                    />
                                </FormControl>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSetTopicName}>Cancel</Button>
                            <Button onClick={handleDialogSetTopicNameSubmit}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </>
    );
};

SharedTopicCard.propTypes = {
    isLoading: PropTypes.bool,
    firstcolor: PropTypes.string,
    secondcolor: PropTypes.string,
    thirdcolor: PropTypes.string,
    title: PropTypes.string,
    creationDate: PropTypes.object,
    topic: PropTypes.object
};

export default SharedTopicCard;
