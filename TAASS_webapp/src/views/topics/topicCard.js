import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets

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
                                                Creation date: {creationDate[0]}/{creationDate[1]}/{creationDate[2]}
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
