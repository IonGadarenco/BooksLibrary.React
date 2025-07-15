import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        ProfilePage
      </Typography>
    </>
  );
};

export default ProfilePage;
