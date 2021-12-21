import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { GoogleLogin } from 'react-google-login';

import { styled } from '@mui/system';

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
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

import * as $ from 'jquery';
import 'jquery.soap';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import Google from 'assets/images/icons/social-google.svg';
import Facebook from 'assets/images/icons/social-facebook.svg';

import { ReactSession } from 'react-client-session';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const [okEmailPassword, setOkEmailpassword] = useState(true);

    const navigate = useNavigate();

    const googleHandler = (response) => {
        console.log(response);
    };

    const facebookHandle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    const handleLogin = async (values) => {
        console.log(values);

        console.log(values.email);
        console.log(values.password);

        let user = {
            name: null,
            surname: null,
            email: values.email,
            password: values.password
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/v1/users/login',
            data: JSON.stringify(user),
            contentType: 'application/json;charset=utf-8'
        })
            .done((response) => {
                console.log('RESPONSE');
                console.log(response);

                console.log('Login Successful');
                setOkEmailpassword(true);

                ReactSession.setStoreType('localStorage');
                ReactSession.set('id', response.id);
                ReactSession.set('username', response.email);
                ReactSession.set('password', response.password);

                navigate('/topics', { replace: false });
            })
            .fail((e, s, t) => {
                console.log(`Failed: ${e.responseText}`);
                setOkEmailpassword(false);
            });

        /* TODO: GESTIRE LA SESSIONE UTENTE */
    };

    const clientID = '282646887193-mj946se9m6a7qgmkl2npmrjfksbcht6r.apps.googleusercontent.com';

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                                Sign in with Google
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
                                textButton="Sign in with Facebook"
                            />
                        </AnimateButton>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
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
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                        {!okEmailPassword && (
                            <Typography variant="subtitle1" sx={{ color: '#ec5a5a' }}>
                                Wrong email or password!
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Forgot Password?
                            </Typography>
                        </Stack>
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
                                    onClick={() => handleLogin(values)}
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
