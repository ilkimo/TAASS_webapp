import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

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

    const [openTopicDetails, setOpenTopicDetails] = React.useState(false);
    const [scrollTopicDetails, setScrollTopicDetails] = React.useState('paper');

    const handleClickOpenTopicDetails = (scrollType) => () => {
        console.log('APRO');
        setAnchorEl(false);
        setOpenTopicDetails(true);
        setScrollTopicDetails(scrollType);
    };

    const handleCloseTopicDetails = () => {
        setOpenTopicDetails(false);
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
                                                <i>Creation date: {creationDate}</i>
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
    creationDate: PropTypes.string,
    topic: PropTypes.object
};

export default SharedTopicCard;
