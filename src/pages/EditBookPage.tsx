import { Helmet } from 'react-helmet-async';
import { Box, CircularProgress, Typography, Alert } from '@mui/material'; // Adaugă CircularProgress și Alert
import EditBookForm from '../components/EditBookForm';
import { useApi } from '../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BookDetails } from '../types/book';
import { BOOK_ENDPOINTS } from '../api/endpoints';

const EditBookPage = () => {
  const api = useApi();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get<BookDetails>(BOOK_ENDPOINTS.BOOK_DETAILS(Number(id)))
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch book details:', err);
        setError('Failed to load book details. Please try again.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography ml={2}>Loading book data...</Typography>
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Alert severity="warning">Book not found or could not be loaded.</Alert>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>{book ? `Edit Book: ${book.title}` : 'Edit Book'}</title>
      </Helmet>
      <Box
        display="flex"
        textAlign="center"
        justifyContent="center"
        sx={{ mt: { xs: 20, md: 4 }, mx: { xs: 2, md: 'auto' } }}
      >
        <EditBookForm book={book} />
      </Box>
    </>
  );
};

export default EditBookPage;
