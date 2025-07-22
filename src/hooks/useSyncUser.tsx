// src/hooks/useSyncUser.ts
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../api/axiosInstance';
import axios from 'axios';
import type { AuthResponseDto } from '../types/dtos/authResponseDto';
import { AUTH_ENDPOINTS } from '../api/endpoints';

const USER_SYNC_SESSION_KEY = 'user_synced_for_session';
const USER_DATA_KEY = 'user_data';

export interface SyncUserResult {
  syncedUser: AuthResponseDto | null;
  isAdmin: boolean;
  loading: boolean; // “haven’t finished loading yet”
  error: string | null;
}

export const useSyncUser = (): SyncUserResult => {
  const { isAuthenticated, user, isLoading: auth0Loading } = useAuth0();
  const api = useApi();

  // undefined → not finished, null → loaded/no‐user, AuthResponseDto → loaded/ok
  const [syncedUser, setSyncedUser] = useState<AuthResponseDto | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for Auth0 to initialize
    if (auth0Loading) return;

    (async () => {
      // 1) Not logged in at all
      if (!isAuthenticated || !user?.sub) {
        setSyncedUser(null);
        sessionStorage.removeItem(USER_SYNC_SESSION_KEY);
        sessionStorage.removeItem(USER_DATA_KEY);
        return;
      }

      // 2) Try to re-hydrate from sessionStorage
      if (sessionStorage.getItem(USER_SYNC_SESSION_KEY) === user.sub) {
        const raw = sessionStorage.getItem(USER_DATA_KEY);
        if (raw) {
          try {
            setSyncedUser(JSON.parse(raw) as AuthResponseDto);
            return;
          } catch {
            // corrupted → fall through to real sync
          }
        }
      }

      // 3) Otherwise, do the real backend sync
      try {
        const { data } = await api.post<AuthResponseDto>(AUTH_ENDPOINTS.SYNC_USER);
        setSyncedUser(data);
        sessionStorage.setItem(USER_SYNC_SESSION_KEY, user.sub);
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
      } catch (err: any) {
        console.error('Sync user failed:', err);
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to sync user with backend.');
        }
        setSyncedUser(null);
      }
    })();
  }, [auth0Loading, isAuthenticated, user?.sub, api]);

  // Still loading if we haven’t set syncedUser or error yet
  const loading = syncedUser === undefined && error === null;

  return {
    syncedUser: syncedUser ?? null,
    isAdmin: syncedUser?.role === 'admin',
    loading,
    error,
  };
};
