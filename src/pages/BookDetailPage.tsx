import { Box, Grid, Typography, CircularProgress, Chip, Divider, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '../api/axiosInstance';
import { BOOK_ENDPOINTS } from '../api/endpoints';
import { useEffect, useState, useCallback } from 'react';
import { type BookDetails, isAdminBookDetails } from '../types/book';
import LikeButton from '../components/LikeButton';
import BookActions from '../components/BookActions';
import ReviewsSection from '../components/ReviewsSection';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const api = useApi();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBookDetails = useCallback(async () => {
    try {
      const response = await api.get<BookDetails>(BOOK_ENDPOINTS.BOOK_DETAILS(Number(id)));
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [api, id]);

  useEffect(() => {
    setLoading(true);
    fetchBookDetails();
  }, [fetchBookDetails]);

  const handleDeleteBook = async () => {
    if (!book) return;

    if (window.confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
      try {
        await api.delete(BOOK_ENDPOINTS.DELETE_BOOK(book.id));
        alert('Book deleted successfully.');
        window.location.href = '/books/paged';
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!book) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 10 }}>
        Book not found.
      </Typography>
    );
  }

  return (
    <>
      <Helmet>
        <title>{book.title}</title>
      </Helmet>

      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{ my: { xs: 20, md: 4 }, mx: 4 }}
        justifyContent="center"
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            component="img"
            src={book.coverImageUrl || '/book-placeholder.avif'}
            alt={book.title}
            sx={{
              width: '100%',
              aspectRatio: '2 / 3',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 5,
              border: '1px solid white',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {book.title}
              </Typography>
              <Typography variant="h6" component="h2" color="text.secondary">
                by {book.authors.map(a => a.fullName).join(', ')}
              </Typography>
              <Box>
                {book.categories.map(category => (
                  <Chip key={category.fullName} label={category.fullName} sx={{ mr: 1, mt: 4 }} />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                Description
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {book.description}
              </Typography>
              <Typography variant="caption" display="block">
                ISBN: {book.isbn}
              </Typography>
              <Typography variant="caption" display="block">
                Publisher: {book.publisher.fullName}
              </Typography>
            </Box>

            {isAdminBookDetails(book) && (
              <Box sx={{ p: 2, backgroundColor: 'grey.200', borderRadius: 2 }}>
                <Typography variant="h6">Admin Panel</Typography>
                <Typography>Active Loans: {book.loans.length}</Typography>
              </Box>
            )}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }} sx={{ mt: { xs: 2, md: 0 } }}>
          <Stack spacing={3} alignItems="center">
            <LikeButton
              bookId={book.id}
              initialLikeCount={book.likeCount}
              initialUserHasLiked={book.userHasLiked}
            />
            <Link
              to={`/admin-dashboard/edit-book/${book.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <EditIcon />
            </Link>
            <DeleteForeverIcon onClick={handleDeleteBook} />

            <BookActions book={book} onActionComplete={fetchBookDetails} />
            <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
              ({book.availableCopies} copies)
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} justifySelf="flex-end" sx={{ mt: 4 }}>
          <ReviewsSection
            bookId={book.id}
            reviews={book.reviews}
            onActionComplete={fetchBookDetails}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BookDetailPage;
