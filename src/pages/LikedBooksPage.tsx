import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Avatar,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import { useApi } from '../api/axiosInstance';

interface LikedBook {
  id: number;
  title: string;
  authors: { fullName: string }[];
  coverImageUrl: string;
}

const LikedBooksPage = () => {
  const api = useApi();
  const [books, setBooks] = useState<LikedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<LikedBook[]>('/api/books/likes')
      .then(res => setBooks(res.data))
      .catch(err => {
        console.error(err);
        setError('Nu am putut încărca cărţile liked.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUnlike = async (bookId: number) => {
    try {
      // presupunem că POST /api/books/{id}/like face toggle
      await api.post(`/api/books/${bookId}/like`);
      // eliminăm cartea din listă
      setBooks(bs => bs.filter(b => b.id !== bookId));
    } catch (err) {
      console.error(err);
      setError('Nu am putut retrage like-ul.');
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }
  if (books.length === 0) {
    return (
      <Typography align="center" mt={4}>
        Nu ai nicio carte liked.
      </Typography>
    );
  }

  return (
    <>
      <Helmet>
        <title>Liked Books</title>
      </Helmet>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Copertă</TableCell>
              <TableCell>Titlu</TableCell>
              <TableCell>Autor(i)</TableCell>
              <TableCell align="center">Like-ul?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell>
                  <Avatar
                    variant="square"
                    src={book.coverImageUrl}
                    sx={{ width: 50, height: 75 }}
                  />
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors.map(a => a.fullName).join(', ')}</TableCell>
                <TableCell align="center">
                  <Checkbox checked={true} onChange={() => handleUnlike(book.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LikedBooksPage;
