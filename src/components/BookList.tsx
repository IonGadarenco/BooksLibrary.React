import { Box, Grid, Typography } from '@mui/material';
import type { BookListType } from '../models/types/bookListType';
import PaginationComponent from './paginationComponent';

interface Props {
  books: BookListType[];
}

const BookList = ({ books }: Props) => {
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {books.map(book => (
          <Grid size={{ xs: 12, sm: 4, md: 3 }} key={book.id}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 5,
                cursor: 'pointer',
                '&:hover .overlay': {
                  height: '50%',
                  padding: 2,
                },
              }}
            >
              <Box
                component="img"
                src={book.coverImageUrl || "https://img.freepik.com/premium-photo/close-up-box-against-white-background_1048944-1896099.jpg?semt=ais_hybrid&w=740"}
                alt={book.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
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
                  justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {book.title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                  {book.description}
                </Typography>
                <Typography variant="caption">ISBN: {book.isbn}</Typography>
                <Typography variant="caption">Copies: {book.totalCopies}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <PaginationComponent />
    </>
  );
};

export default BookList;
