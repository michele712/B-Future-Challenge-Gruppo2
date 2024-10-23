import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Sostituisci con il tuo URL API

export const fetchClients = () => axios.get(`${API_URL}/clients`);
export const fetchServices = () => axios.get(`${API_URL}/services`);
export const fetchProjects = (clientId) => axios.get(`${API_URL}/clients/${clientId}/projects`);
export const fetchRecommendations = (clientId) => axios.get(`${API_URL}/clients/${clientId}/recommendations`);
export const fetchSuccessStories = () => axios.get(`${API_URL}/success-stories`);
