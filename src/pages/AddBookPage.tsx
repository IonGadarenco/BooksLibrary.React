import { Helmet } from 'react-helmet-async';
import AddBookForm from '../components/AddBookForm';
import { Box } from '@mui/material';

const AddBookPage = () => {
  return (
    <>
      <Helmet>
        <title>Add Book</title>
      </Helmet>
      <Box
        display="flex"
        textAlign="center"
        justifyContent="center"
        sx={{ mt: { xs: 20, md: 4 }, mx: { xs: 2, md: 'auto' } }}
      >
        <AddBookForm />
      </Box>
    </>
  );
};

export default AddBookPage;
