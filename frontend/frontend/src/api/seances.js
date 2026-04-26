import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000' });
export const getSeances = () => API.get('/seances/').then(r => r.data);
export const createSeance = (data) => API.post('/seances/', data).then(r => r.data);
export const getPlanningGroupe = (id) => API.get(`/seances/planning/groupe/${id}`).then(r => r.data);
export const getChargeHoraire = (id) => API.get(`/seances/charge-horaire/${id}`).then(r => r.data);
