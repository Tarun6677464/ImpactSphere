import axios from 'axios';
import { toast } from 'sonner';
import { logger } from './logger';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.includes('/login')) {
        toast.error('Session expired. Please sign in again.');
        window.location.href = '/login';
      }
    }
    if (status >= 500) {
      logger.error('Server error', error?.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
