import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import { TextField, FormControl } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Row, Col, Container } from 'react-bootstrap';

// ==============================|| TYPOGRAPHY ||============================== //

const Profile = () => (
    <MainCard>
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}
        >
            <MuiTypography variant="h2">Profile</MuiTypography>
            <AccountCircleIcon className="iconColor mx-4" fontSize="medium" />
        </div>

        <div className="pageStyle">
            <Container>
                <Row>
                    <Col xs={6} lg={6}>
                        <div className="row">
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <TextField id="username" label="Username" variant="outlined" />
                            </FormControl>
                        </div>
                        <div className="row">
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <TextField id="email" label="Email" variant="outlined" />
                            </FormControl>
                        </div>
                        <div className="row">
                            <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                <TextField id="password" label="Password" type="password" variant="outlined" />
                            </FormControl>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </MainCard>
);

export default Profile;
