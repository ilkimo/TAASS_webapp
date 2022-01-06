import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import $ from 'jquery';

import { ReactSession } from 'react-client-session';

import { useSession, loadDataFromStorage, getSession, setSession } from 'react-session-persist';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const [okEmailPassword, setOkEmailpassword] = useState(true);
    const [emailInUse, setEmailInUse] = useState(false);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const clientID = '282646887193-mj946se9m6a7qgmkl2npmrjfksbcht6r.apps.googleusercontent.com';
    const navigate = useNavigate();

    const { authenticated, saveSession } = useSession();

    const facebookHandle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    const googleHandler = (response) => {
        console.log(response);
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const validateEmail = (email) =>
        String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

    const handleRegister = async (values) => {
        console.log('Register');

        console.log(values.firstname);
        console.log(values.lastname);
        console.log(values.email);
        console.log(values.password);

        if ((values.email === '' && values.password === '') || !validateEmail(values.email)) {
            console.log('SONO QUA');
            setEmailInUse(false);
            setOkEmailpassword(false);
        } else {
            let user = {
                name: null,
                surname: null,
                email: values.email,
                password: values.password
            };

            console.log(JSON.stringify(user));

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/gateway/create',
                data: JSON.stringify(user),
                contentType: 'application/json;charset=utf-8'
            })
                .done((response) => {
                    console.log('RESPONSE');
                    console.log(response);

                    console.log('Register Successful');

                    saveSession({ user: response.userInformation });

                    ReactSession.setStoreType('localStorage');
                    ReactSession.set('id', response.userInformation.id);
                    ReactSession.set('username', response.userInformation.email);
                    ReactSession.set('password', response.userInformation.password);
                    ReactSession.set('googleLogin', false);

                    navigate('/topics', { replace: false });

                    /*
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/v2/data/newuser',
                        data: String(response.userInformation.id),
                        contentType: 'application/json;charset=utf-8'
                    })
                        .done((resp) => {
                            console.log('RESPONSE');
                            console.log(resp);

                            navigate('/topics', { replace: false });
                        })
                        .fail((e, s, t) => {
                            console.log(`Failed: ${e.responseText}`);
                        });

                     */
                })
                .fail((e, s, t) => {
                    console.log(`Failed: ${e.responseText}`);
                    setOkEmailpassword(true);
                    setEmailInUse(true);
                });
        }

        /* TODO: GESTIRE LA SESSIONE UTENTE */
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <AnimateButton>
                            <GoogleLogin
                                disableElevation
                                onSuccess={googleHandler}
                                size="large"
                                variant="outlined"
                                cookiePolicy="single_host_origin"
                                clientId={clientID}
                                className="googleLoginButton"
                            >
                                Sign up with Google
                            </GoogleLogin>
                        </AnimateButton>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <AnimateButton>
                            <FacebookLogin
                                appId="108859793115576"
                                // autoLoad
                                size="small"
                                fields="name,email,picture"
                                onClick={facebookHandle}
                                callback={responseFacebook}
                                // icon="fa-facebook"
                                cssClass="facebookLoginButton"
                                textButton="Sign up with Facebook"
                            />
                        </AnimateButton>
                    </FormControl>
                </Grid>
                {/*
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                */}
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                        {!okEmailPassword && (
                            <Typography variant="subtitle1" sx={{ color: '#ec5a5a' }}>
                                Please insert a valid email and password
                            </Typography>
                        )}

                        {emailInUse && (
                            <Typography variant="subtitle1" sx={{ color: '#ec5a5a' }}>
                                Email is already in use!
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    // handleChangeFirstname,
                    // handleChangeLastname,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {/*
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="fname"
                                    type="text"
                                    // value={values.firstname}
                                    // onChange={handleChangeFirstname}
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lname"
                                    type="text"
                                    // value={values.lastname}
                                    // onChange={handleChangeLastname}
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        */}
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleRegister(values)}
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
