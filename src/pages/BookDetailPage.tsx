import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const BookDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Book Details</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        BookDetailPage
      </Typography>
    </>
  );
};

export default BookDetailPage;
