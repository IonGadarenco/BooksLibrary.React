import { Box, Grid, Typography } from '@mui/material';
import PaginationComponent from './PaginationComponent';
import { Link } from 'react-router-dom';
import type { BookListItem } from '../types/book';

interface Props {
  books: BookListItem[];
}

const BookList = ({ books }: Props) => {
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {books.map(book => (
          <Grid size={{ xs: 12, sm: 4, md: 3 }} key={book.id}>
            <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: 5,
                  cursor: 'pointer',
                  '&:hover .overlay': {
                    height: '60%',
                    padding: 2,
                  },
                }}
              >
                <Box
                  component="img"
                  src={book.coverImageUrl || '../public/book-placeholder.avif'}
                  alt={book.title}
                  sx={{
                    width: '100%',
                    aspectRatio: '2 / 3',
                    objectFit: 'cover',
                    display: 'block',
                    border: '1px solid white',
                    borderRadius: 2,
                  }}
                />

                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    width: '100%',
                    height: '0%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    transition: 'height 0.4s ease',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {book.authors.map(author => author.fullName).join(', ')}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      <PaginationComponent />
    </>
  );
};

export default BookList;
