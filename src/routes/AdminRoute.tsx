// src/routes/AdminRoute.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth0 }        from '@auth0/auth0-react';
import { useSyncUser }     from '../hooks/useSyncUser';

export const AdminRoute = () => {
  const { isAuthenticated, isLoading: auth0Loading, loginWithRedirect } = useAuth0();
  const { syncedUser, isAdmin, loading } = useSyncUser();

  // 1) Wait for Auth0 *and* our own sync → show spinner
  if (auth0Loading || loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // 2) If Auth0 says “not authenticated” → kick off login
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  // 3) We’re authenticated but no user came back → treat as not‐logged‐in
  if (!syncedUser) {
    return <Navigate to="/login" replace />;
  }

  // 4) Logged in but not an admin → access denied
  if (!isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  // 5) OK, we are an admin → render the child routes
  return <Outlet />;
};