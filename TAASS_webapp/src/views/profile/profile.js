// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { TextField, FormControl, FilledInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Row, Col, Container } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// ==============================|| TYPOGRAPHY ||============================== //

const Profile = () => {
    /* Edit Topic Name */
    const [openEditPassword, setOpenEditPassword] = React.useState(false);
    const [scrollEditPassword, setScrollEditPassword] = React.useState('paper');

    const handleClickOpenEditTopic = (scrollType) => () => {
        setOpenEditPassword(true);
        setScrollEditPassword(scrollType);
    };

    const handleCloseEditTopic = () => {
        setOpenEditPassword(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openEditPassword) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openEditPassword]);

    /* TEST */
    const [values, setValues] = React.useState({
        username: '',
        mail: '',
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        showOldPassword: false,
        showNewPassword: false,
        showRepeatNewPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowOldPassword = () => {
        setValues({
            ...values,
            showOldPassword: !values.showOldPassword
        });
    };

    const handleMouseDownOldPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword
        });
    };

    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowRepeatNewPassword = () => {
        setValues({
            ...values,
            showRepeatNewPassword: !values.showRepeatNewPassword
        });
    };

    const handleMouseDownRepeatNewPassword = (event) => {
        event.preventDefault();
    };

    const handleDialogEditPasswordSubmit = () => {
        console.log(`old password:${values.oldPassword}`);
        console.log(`new password:${values.newPassword}`);
        console.log(`repeat new password:${values.repeatNewPassword}`);
    };

    return (
        <div>
            <MainCard>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 20
                    }}
                >
                    <Typography component="span" variant="h2">
                        Profile
                    </Typography>
                    <AccountCircleIcon className="iconColor mx-4" fontSize="medium" />
                </div>

                <div>
                    <Grid container>
                        <Grid item xs={6} lg={6}>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-username">Username</InputLabel>
                                <FilledInput disabled id="filled-adornment-username" type="text" value={values.username} />
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-mail">Mail</InputLabel>
                                <FilledInput disabled id="filled-adornment-mail" type="text" value={values.mail} />
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    disabled
                                    id="filled-adornment-password"
                                    type="password"
                                    value={values.password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <EditIcon
                                                className="iconColor"
                                                fontSize="medium"
                                                style={{ cursor: 'pointer' }}
                                                onClick={handleClickOpenEditTopic('paper')}
                                            />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </MainCard>

            <Dialog
                open={openEditPassword}
                onClose={handleCloseEditTopic}
                scroll={scrollEditPassword}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <div>
                        <Typography component="span" variant="h2">
                            <div>Edit Password</div>
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scrollEditPassword === 'paper'}>
                    <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-oldPassword">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-oldPassword"
                                type={values.showOldPassword ? 'text' : 'password'}
                                value={values.oldPassword}
                                onChange={handleChange('oldPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowOldPassword}
                                            onMouseDown={handleMouseDownOldPassword}
                                            edge="end"
                                        >
                                            {values.showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-newPassword">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-newPassword"
                                type={values.showNewPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                onChange={handleChange('newPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownNewPassword}
                                            edge="end"
                                        >
                                            {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-repeatNewPassword">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-repeatNewPassword"
                                type={values.showRepeatNewPassword ? 'text' : 'password'}
                                value={values.repeatNewPassword}
                                onChange={handleChange('repeatNewPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowRepeatNewPassword}
                                            onMouseDown={handleMouseDownRepeatNewPassword}
                                            edge="end"
                                        >
                                            {values.showRepeatNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditTopic}>Cancel</Button>
                    <Button onClick={handleDialogEditPasswordSubmit}>Change Password</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;
