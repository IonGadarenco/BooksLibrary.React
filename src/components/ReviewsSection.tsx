import { Box, Typography, Divider, TextField, Button, Stack, Alert } from '@mui/material';
import { type Review } from '../types/review';
import { useState } from 'react';
import { useApi } from '../api/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import { BOOK_ENDPOINTS } from '../api/endpoints';

interface ReviewsSectionProps {
  bookId: number;
  reviews: Review[];
  onActionComplete: () => void;
}

export default function ReviewsSection({ bookId, reviews, onActionComplete }: ReviewsSectionProps) {
  const api = useApi();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      return;
    }
    if (!comment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await api.post(BOOK_ENDPOINTS.ADD_REVIEW(bookId), { comment });
      setComment('');
      onActionComplete(); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      console.error('Failed to submit review', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h3" gutterBottom>
        Reviews ({reviews.length})
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Leave a Review
        </Typography>
        <TextField
          label="Your thoughts on this book..."
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={e => setComment(e.target.value)}
          variant="outlined"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Stack spacing={3} alignItems="flex-end">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Box key={review.createdAt} sx={{ p: 1, border: '1px solid #ccc', borderRadius: 2, maxWidth: 'fit-content', width: '100%' }}>
              <Typography fontWeight="bold" component="p">
                {review.userName}
              </Typography>
              <Typography variant="caption" color="text.secondary" component="p" gutterBottom>
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {review.comment}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>Be the first to review this book!</Typography>
        )}
      </Stack>
    </Box>
  );
}
