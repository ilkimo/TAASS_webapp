import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Topics = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            SETTINGS
        </Grid>
    );
};

export default Topics;
