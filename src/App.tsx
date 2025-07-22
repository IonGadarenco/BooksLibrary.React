import {
  Alert,
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { getTheme } from './theme/Theme';
import { BooksProvider } from './contexts/booksContext';
import { RequestProvider } from './contexts/requestContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useSyncUser } from './hooks/useSyncUser';
import AppRoutes from './routes/AppRoutes';
import ReplayIcon from '@mui/icons-material/Replay';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './contexts/themeContext';

const App = () => {
  const { isLoading: auth0Loading, error: auth0Error, isAuthenticated, isLoading, user, error, getAccessTokenSilently } = useAuth0();
  const { loading, error: syncError } = useSyncUser();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    console.log('Auth0 State:');
    console.log('  isAuthenticated:', isAuthenticated);
    console.log('  isLoading:', isLoading);
    console.log('  User:', user);
    console.log('  Error:', error);

    if (isAuthenticated) {
      getAccessTokenSilently()
        .then(token => console.log('Access Token (silently):', token))
        .catch(e => console.error('Error getting token silently:', e));
    }
  }, [isAuthenticated, user, isLoading, error, getAccessTokenSilently]);

  if (auth0Loading) {
    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 20 }}>
          <Typography variant="h6" color="text.secondary">
            Loading authentication...
          </Typography>
          <CircularProgress size={100} />
        </Box>
      </>
    );
  }

  if (auth0Error) {
    return (
      <>
        <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
          {auth0Error.message}
        </Alert>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 20 }}>
          <Typography variant="h6" color="text.secondary">
            Is syncing user data...
          </Typography>
          <CircularProgress size={100} />
        </Box>
      </>
    );
  }

  if (syncError) {
    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 25 }}>
          <ReplayIcon
            sx={{
              cursor: 'pointer',
              color: 'error.main',
              fontSize: 150,
            }}
            onClick={() => window.location.reload()}
          />
          <Typography variant="h6" color="text.secondary">
            {syncError} Click the icon to retry.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
        <ThemeProvider theme={getTheme(mode)}>
          <RequestProvider>
            <BooksProvider>
              <CssBaseline />
              <AppRoutes />
            </BooksProvider>
          </RequestProvider>
        </ThemeProvider>
    </>
  );
};

export default App;
