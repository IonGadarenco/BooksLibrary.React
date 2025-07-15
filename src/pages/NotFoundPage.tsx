import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        NotFoundPage
      </Typography>
    </>
  );
};

export default NotFoundPage;
