import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

const API_URL = 'http://localhost:5000';

export const $clientHost = axios.create({
  baseURL: API_URL
});

const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (config.headers)
    config.headers.authorization = `Bearer ${getCookie('auth') || ''}`;
  return config;
};

$clientHost.interceptors.request.use(authInterceptor);
