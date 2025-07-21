// hooks/useApi.ts
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';

export const useApi = () => {
  // 1. Extrage și `isAuthenticated` din hook-ul useAuth0
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const api = useMemo(() => {
    const instance = axios.create({
      // Este o practică bună să folosești variabile de mediu aici
      baseURL: 'https://localhost:7118/',
    });

    instance.interceptors.request.use(
      async (config) => {
        try {
          // Nu este nevoie să verifici isAuthenticated aici, deoarece
          // interceptorul se va re-crea la schimbarea stării.
          const token = await getAccessTokenSilently();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          // Este bine să loghezi eroarea dacă token-ul nu poate fi obținut
          console.error('Could not get access token for API request', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  // 2. Adaugă `isAuthenticated` la lista de dependențe a useMemo
  }, [getAccessTokenSilently, isAuthenticated]);

  return api;
};