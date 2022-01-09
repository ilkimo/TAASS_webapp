import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { TextField, FormControl, FormLabel, FormGroup, FormControlLabel, Switch } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Row, Col, Container } from 'react-bootstrap';
import React from 'react';
// ==============================|| TYPOGRAPHY ||============================== //

export default function Settings() {
    const [shareTopicsChecked, setShareTopicsChecked] = React.useState(false);

    const handleShareSwitchChange = (event) => {
        setShareTopicsChecked(event.target.checked);
    };

    return (
        <MainCard>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <MuiTypography variant="h2">Settings</MuiTypography>
                <SettingsIcon className="iconColor mx-4" fontSize="medium" />
            </div>

            <FormControl component="fieldset">
                <FormLabel component="legend" />
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" checked={shareTopicsChecked} onChange={handleShareSwitchChange} />}
                        label="Share Topics with others"
                        labelPlacement="start"
                    />
                </FormGroup>
            </FormControl>
        </MainCard>
    );
}
