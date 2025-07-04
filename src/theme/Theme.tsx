import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
  palette: {
    mode: mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  }
});
