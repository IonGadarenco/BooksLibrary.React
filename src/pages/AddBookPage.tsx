import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AddBookForm from '../components/AddBookForm';

const AddBookPage = () => {
  return (
    <>
      <Helmet>
        <title>Add Book</title>
      </Helmet>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        <AddBookForm/>
      </Typography>
    </>
  );
};

export default AddBookPage;
