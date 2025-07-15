import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        HomePage
      </Typography>
    </>
  );
};

export default HomePage;
