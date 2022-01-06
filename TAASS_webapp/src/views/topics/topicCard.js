import PropTypes from 'prop-types';
import { useState } from 'react';

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
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

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

const TopicCard = ({ isLoading, firstcolor, secondcolor, thirdcolor, title, creationDate }) => {
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

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper
                    className="zoom"
                    sx={{ height: 150 }}
                    border={false}
                    content={false}
                    firstcolor={firstcolor}
                    secondcolor={secondcolor}
                    thirdcolor={thirdcolor}
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
            )}
        </>
    );
};

TopicCard.propTypes = {
    isLoading: PropTypes.bool,
    firstcolor: PropTypes.string,
    secondcolor: PropTypes.string,
    thirdcolor: PropTypes.string,
    title: PropTypes.string,
    creationDate: PropTypes.string
};

export default TopicCard;
