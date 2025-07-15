import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const SavedBooksPage = () => {
  return (
    <>
      <Helmet>
        <title>Saved Books</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        SavedBooksPage
      </Typography>
    </>
  );
};

export default SavedBooksPage;
