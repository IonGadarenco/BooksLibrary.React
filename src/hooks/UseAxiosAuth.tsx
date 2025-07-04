import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { axiosInstance } from '../api/AxiosInstance';

export const useAxiosAuth = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(async config => {
      const token = await getAccessTokenSilently();
      console.log(token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [getAccessTokenSilently]);

  return axiosInstance;
};
