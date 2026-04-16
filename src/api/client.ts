import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

if (!BASE_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined. Check your .env file.');
}

if (!USER_ID) {
  throw new Error('EXPO_PUBLIC_USER_ID is not defined. Check your .env file.');
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${USER_ID}`,
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { error?: { message?: string } })?.error?.message ??
      error.message ??
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  },
);
