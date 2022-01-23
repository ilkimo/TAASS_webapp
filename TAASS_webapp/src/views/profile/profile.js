// project imports
import MainCard from 'ui-component/cards/MainCard';

import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getSession, saveSession } from 'react-session-persist/lib';
import { Alert } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import $ from 'jquery';
import { backendUrl } from '../../utils/utils';

// ==============================|| TYPOGRAPHY ||============================== //
const Profile = () => {
    /* TEST */
    const [values, setValues] = React.useState({
        username: '',
        mail: '',
        password: '',
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        showOldPassword: false,
        showNewPassword: false,
        showRepeatNewPassword: false
    });

    const [loggedWithGoogle, setLoggedWithGoogle] = useState(false);

    useEffect(() => {
        async function getSessionUser() {
            // You need to restrict it at some point
            // This is just dummy code and should be replaced by actual
            const session = await getSession();
            console.log(session);
            setValues({
                ...values,
                username: session.user.email,
                password: session.user.password
            });

            setLoggedWithGoogle(session.googleLogin);
        }

        getSessionUser();
    }, []);

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

    const [openCompileAllForms, setOpenCompileAllForms] = React.useState(false);
    const [openMatchPassword, setOpenMatchPassword] = React.useState(false);
    const [openPasswordChanged, setOpenPasswordChanged] = React.useState(false);

    const handleDialogEditPasswordSubmit = async () => {
        console.log(`old password:${values.oldPassword}`);
        console.log(`new password:${values.newPassword}`);
        console.log(`repeat new password:${values.repeatNewPassword}`);

        /* Controllare tutti i dati! Ogni valore deve essere stato inserito */
        if (
            values.oldPassword.replace(/\s/g, '').length > 0 &&
            values.newPassword.replace(/\s/g, '').length > 0 &&
            values.repeatNewPassword.replace(/\s/g, '').length > 0
        ) {
            if (values.newPassword === values.repeatNewPassword) {
                // query

                const session = await getSession();
                console.log(session);

                let obj = {
                    id: session.user.id,
                    password: values.oldPassword,
                    newPassword: values.newPassword,
                    mail: null,
                    newMail: null,
                    newName: null,
                    newSurname: null
                };

                console.log(obj);

                $.ajax({
                    type: 'POST',
                    url: `${backendUrl}changePassword`,
                    data: JSON.stringify(obj),
                    contentType: 'application/json;charset=utf-8'
                })
                    .done((response) => {
                        console.log('RESPONSE');
                        console.log(response);

                        console.log('Register Successful');

                        saveSession({ user: response });

                        //
                        setValues({
                            ...values,
                            password: values.newPassword
                        });

                        setOpenPasswordChanged(true);
                        setOpenCompileAllForms(false);
                        setOpenMatchPassword(false);
                    })
                    .fail((e, s, t) => {
                        console.log(`Failed: ${e.responseText}`);
                        setOpenCompileAllForms(true);
                    });
            } else {
                setOpenMatchPassword(true);
                setOpenCompileAllForms(false);
            }
        } else {
            setOpenCompileAllForms(true);
            setOpenMatchPassword(false);
        }
    };

    const handleClickCloseMatchPassword = () => {
        setOpenMatchPassword(false);
    };

    const handleClickCloseError = () => {
        setOpenCompileAllForms(false);
    };

    const handleClickClosePasswordChanged = () => {
        setOpenPasswordChanged(false);
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

                            {loggedWithGoogle ? (
                                <div />
                            ) : (
                                <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        disabled
                                        id="filled-adornment-password"
                                        type="text"
                                        // value={values.password}
                                        value="change password"
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
                            )}
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
                    <Collapse in={openPasswordChanged}>
                        <Alert
                            variant="filled"
                            severity="success"
                            action={
                                <IconButton aria-label="close" color="inherit" size="small" onClick={handleClickClosePasswordChanged}>
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, mt: 2 }}
                        >
                            Password Changed!
                        </Alert>
                    </Collapse>
                    <Collapse in={openCompileAllForms}>
                        <Alert
                            variant="filled"
                            severity="error"
                            action={
                                <IconButton aria-label="close" color="inherit" size="small" onClick={handleClickCloseError}>
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, mt: 2 }}
                        >
                            Error!
                        </Alert>
                    </Collapse>
                    <Collapse in={openMatchPassword}>
                        <Alert
                            variant="filled"
                            severity="error"
                            action={
                                <IconButton aria-label="close" color="inherit" size="small" onClick={handleClickCloseMatchPassword}>
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, mt: 2 }}
                        >
                            Please match new password!
                        </Alert>
                    </Collapse>

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
