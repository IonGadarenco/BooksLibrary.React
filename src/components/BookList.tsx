import type { Book } from '../contexts/BooksContext';
import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';

interface Props {
  books: Book[];
}

const BookList = ({ books }: Props) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {books.map(book => (
        <Card key={book.id} sx={{ width: 250 }}>
          <CardMedia
            component="img"
            height="160"
            image="https://i.pinimg.com/236x/53/19/ac/5319ac6deb4d63bf5f3bfc7ee505bd1f--all-about-food-homemade-food.jpg?nii=t"
            alt={book.title}
          />
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2">{book.description}</Typography>
            <Typography variant="caption">ISBN: {book.isbn}</Typography>
            <Typography variant="caption">Total Copies: {book.totalCopies}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BookList;
