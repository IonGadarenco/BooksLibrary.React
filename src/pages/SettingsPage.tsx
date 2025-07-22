import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Snackbar,
  Alert,
  type SelectChangeEvent,
} from '@mui/material';

const SettingsPage = () => {
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const availableOptions = [2, 4, 8, 12, 16, 20, 24, 28, 32];

  useEffect(() => {
    const savedBooksPerPage = localStorage.getItem('booksPerPage');
    if (savedBooksPerPage) {
      setBooksPerPage(parseInt(savedBooksPerPage, 10));
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newValue = event.target.value as number; 

    setBooksPerPage(newValue);
    localStorage.setItem('booksPerPage', newValue.toString()); 
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        my: { xs: 4, md: 8 },
        mx: { xs: 2, md: 'auto' },
        maxWidth: 600,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Settings for Books Display
          </Typography>

          <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
            <InputLabel id="books-per-page-label">Books per Page</InputLabel>
            <Select
              labelId="books-per-page-label"
              id="books-per-page-select"
              value={booksPerPage}
              label="Books per Page"
              onChange={handleChange}
            >
              {availableOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" color="text.secondary">
            This setting controls how many books are displayed per page in the book list.
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Settings updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
