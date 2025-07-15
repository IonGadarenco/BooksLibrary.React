import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const AdminDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        AdminDashboardPage
      </Typography>
    </>
  );
};

export default AdminDashboardPage;
