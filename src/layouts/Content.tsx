import { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';
import BookList from '../components/BookList';
import { Box, Container, Typography } from '@mui/material';

const Content = () => {
  const { books } = useContext(BooksContext);

  return (
    <>
      <Box
        component="main"
        sx={{
          mt: 11, // margin top to avoid being hidden under AppBar (8 * 8px = 64px)
          px: 20,
          py: 2,
          minHeight: 'calc(100vh - 70px - 70px)', // subtract AppBar + Footer heights
        }}
      >
        <Container>
          <Typography component="div" sx={{ my: 2 }}>
            {books.length > 0 ? <BookList books={books} /> : <p>No books found. Try searching.</p>}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Content;
