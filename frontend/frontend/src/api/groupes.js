import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const getGroupes = () => API.get('/groupes/').then(r => r.data);
