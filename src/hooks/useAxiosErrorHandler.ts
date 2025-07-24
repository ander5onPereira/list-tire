import { toastError } from '@function/notifications';
import { api } from '@services/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAxiosErrorHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        const status = error.response?.status;
        const message = error?.response?.data?.message ?? 'Erro desconhecido';

        if (status === 400 || status === 500) {
          toastError({ content: message });

          // Delay to display toast before redirecting
          setTimeout(() => {
             window.location.href = '/';
          }, 1500); // small delay
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
}
