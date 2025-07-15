import { Container, Typography } from '@mui/material';
import BookList from '../components/BookList';
import { BooksContext } from '../contexts/booksContext';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

const BooksListPage = () => {
  const { books } = useContext(BooksContext);

  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <Container fixed>
        {books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No books found. Try searching.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default BooksListPage;
