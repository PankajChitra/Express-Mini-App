// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  // In development this works with Vite proxy (see vite.config.js).
  // In production set VITE_API_URL to your backend URL.
  baseURL: import.meta.env.VITE_API_URL ,
});
if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL not set");
}

// Attach token automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;