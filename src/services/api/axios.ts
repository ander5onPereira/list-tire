import axios from 'axios';

export function getAPIClient() {
  const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: import.meta.env.VITE_API_URL,
  });
  return api;
}
