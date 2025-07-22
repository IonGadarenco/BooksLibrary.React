import { Button, Box, Alert } from '@mui/material';
import { type BookDetails } from '../types/book';
import { useApi } from '../api/axiosInstance';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BOOK_ENDPOINTS } from '../api/endpoints';

interface BookActionsProps {
  book: BookDetails;
  onActionComplete: () => void;
}

export default function BookActions({ book, onActionComplete }: BookActionsProps) {
  const api = useApi();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: 'reserve' | 'cancel') => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      if (action === 'reserve') {
        await api.post(BOOK_ENDPOINTS.RESERVE_BOOK(book.id));
      } else if (action === 'cancel') {
        await api.delete(BOOK_ENDPOINTS.CANCEL_RESERVATION(book.id));
      }
      onActionComplete(); 
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to ${action} reservation.`);
      console.error(`Failed to ${action} book`, err);
    } finally {
      setIsLoading(false);
    }
  };

  if (book.userHasActiveLoan) {
    return <Alert severity="success">You currently have this book on loan.</Alert>;
  }

  return (
    <Box>
      {book.userHasActiveReservation ? (
        <Button variant="outlined" color="error" onClick={() => handleAction('cancel')} disabled={isLoading}>
          Cancel Reservation
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={() => handleAction('reserve')}
          disabled={isLoading}
        >
          {book.availableCopies > 0 ? 'Reserve This Book' : 'Join Waiting List'}
        </Button>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}