import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const getSalles = () => API.get('/salles/').then(r => r.data);
