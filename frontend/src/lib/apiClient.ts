import axios, { type AxiosInstance } from 'axios';
import useAuthStore from '@/store/authStore';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5174',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
