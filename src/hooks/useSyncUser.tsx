import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../api/axiosInstance';
import axios from 'axios';
import type { AuthResponseDto } from '../types/dtos/authResponseDto';
import { AUTH_ENDPOINTS } from '../api/endpoints';

const USER_SYNC_SESSION_KEY = 'user_synced_for_session';

export const useSyncUser = () => {
  const { isAuthenticated, user } = useAuth0();
  const api = useApi();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncedUser, setSyncedUser] = useState<AuthResponseDto | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthenticated || !user?.sub) {
        setSyncedUser(null);
        sessionStorage.removeItem(USER_SYNC_SESSION_KEY);
        return;
      }

      setIsSyncing(true);
      setSyncError(null);

      try {
        const { data } = await api.post<AuthResponseDto>(AUTH_ENDPOINTS.SYNC_USER);
        setSyncedUser(data);
        sessionStorage.setItem(USER_SYNC_SESSION_KEY, user.sub);
        sessionStorage.setItem('user_data', JSON.stringify(data));
      } catch (err) {
        console.error('Error syncing user with backend:', err);
        if (axios.isAxiosError(err) && err.response) {
          setSyncError(err.response.data?.message ?? 'Failed to sync user with backend.');
        } else {
          setSyncError('Failed to sync user with backend.');
        }
      } finally {
        setIsSyncing(false);
      }
    };

    if (sessionStorage.getItem(USER_SYNC_SESSION_KEY) === user?.sub) {
      const stored = sessionStorage.getItem('user_data');
      if (stored) {
        setSyncedUser(JSON.parse(stored) as AuthResponseDto);
      } else {
        syncUser();
      }
    } else {
      syncUser();
    }
  }, [isAuthenticated, user?.sub, api]);

  // derivăm isAdmin
  const isAdmin = syncedUser?.role === 'admin';

  return { syncedUser, isSyncing, syncError, isAdmin };
};
