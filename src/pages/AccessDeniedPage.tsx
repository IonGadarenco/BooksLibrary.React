import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const AccessDeniedPage = () => {
  return (
    <>
      <Helmet>
        <title>Access Denied</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        AccessDeniedPage
      </Typography>
    </>
  );
};

export default AccessDeniedPage;
