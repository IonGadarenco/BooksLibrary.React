// src/hooks/useSyncUser.ts
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../api/axiosInstance';
import axios from 'axios';
import type { AuthResponseDto } from '../types/dtos/authResponseDto';
import { AUTH_ENDPOINTS } from '../api/endpoints';

const USER_SYNC_SESSION_KEY = 'user_synced_for_session';

export const useSyncUser = () => {
  const { isAuthenticated, user, isLoading: auth0IsLoading } = useAuth0();
  const api = useApi();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncedUser, setSyncedUser] = useState<AuthResponseDto | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthenticated || !user) {
        setSyncedUser(null);
        sessionStorage.removeItem(USER_SYNC_SESSION_KEY);
        setIsSyncing(false);
        return;
      }

      if (auth0IsLoading || !user.sub) {
        setIsSyncing(false);
        return;
      }

      const userIdentifier: string = user.sub;

      const hasSyncedInSession = sessionStorage.getItem(USER_SYNC_SESSION_KEY) === userIdentifier;

      if (hasSyncedInSession) {
        console.log('User already synced in this session. Skipping sync.');
        setIsSyncing(false);
        return;
      }

      setIsSyncing(true);
      setSyncError(null);

      try {
        console.log('Attempting to sync user with backend...');
        const response = await api.post<AuthResponseDto>(AUTH_ENDPOINTS.SYNC_USER);

        setSyncedUser(response.data);
        console.log('User synced with backend:', response.data);

        sessionStorage.setItem(USER_SYNC_SESSION_KEY, userIdentifier);
      } catch (error) {
        console.error('Error syncing user with backend:', error);
        if (axios.isAxiosError(error) && error.response) {
          setSyncError(error.response.data.message || 'Failed to sync user with backend.');
        } else {
          setSyncError('Failed to sync user with backend.');
        }
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isAuthenticated, user?.sub, api, auth0IsLoading]);

  console.log('useSyncUser state:', { syncedUser, isSyncing, syncError });

  return { syncedUser, isSyncing, syncError };
};
