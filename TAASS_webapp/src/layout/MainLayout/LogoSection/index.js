import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import MuiTypography from '@mui/material/Typography';
import React from 'react';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/* <Logo /> */}
        <MuiTypography variant="h2">DATAHUB</MuiTypography>
    </ButtonBase>
);

export default LogoSection;
