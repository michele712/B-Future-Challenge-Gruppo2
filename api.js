import axios from 'axios';

const API_URL = 'https://b-future-challenge-gruppo2-3.onrender.com'';
 // Sostituisci con l'URL della tua API

// Funzioni per le Business Units
export const getBusinessUnits = async () => {
    const response = await axios.get(`${API_URL}/business-units/`);
    return response.data;
};

export const getBusinessUnit = async (id) => {
    const response = await axios.get(`${API_URL}/business-units/${id}`);
    return response.data;
};

export const createBusinessUnit = async (businessUnit) => {
    const response = await axios.post(`${API_URL}/business-units/`, businessUnit);
    return response.data;
};

export const updateBusinessUnit = async (id, businessUnit) => {
    const response = await axios.put(`${API_URL}/business-units/${id}`, businessUnit);
    return response.data;
};

export const deleteBusinessUnit = async (id) => {
    await axios.delete(`${API_URL}/business-units/${id}`);
};

// Funzioni per i Services
export const getServices = async () => {
    const response = await axios.get(`${API_URL}/services/`);
    return response.data;
};

export const getService = async (id) => {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data;
};

export const createService = async (service) => {
    const response = await axios.post(`${API_URL}/services/`, service);
    return response.data;
};

export const updateService = async (id, service) => {
    const response = await axios.put(`${API_URL}/services/${id}`, service);
    return response.data;
};

export const deleteService = async (id) => {
    await axios.delete(`${API_URL}/services/${id}`);
};

// Funzioni per i Clients
export const getClients = async () => {
    const response = await axios.get(`${API_URL}/clients/`);
    return response.data;
};

export const getClient = async (id) => {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data;
};

export const createClient = async (client) => {
    const response = await axios.post(`${API_URL}/clients/`, client);
    return response.data;
};

export const updateClient = async (id, client) => {
    const response = await axios.put(`${API_URL}/clients/${id}`, client);
    return response.data;
};

export const deleteClient = async (id) => {
    await axios.delete(`${API_URL}/clients/${id}`);
};

// Funzioni per Client Details
export const getClientDetails = async (clientId) => {
    const response = await axios.get(`${API_URL}/clients/${clientId}/details`);
    return response.data;
};

export const upsertClientDetails = async (clientId, details) => {
    const response = await axios.put(`${API_URL}/clients/${clientId}/details`, details);
    return response.data;
};

export const deleteClientDetails = async (clientId) => {
    await axios.delete(`${API_URL}/clients/${clientId}/details`);
};

// Funzioni per Client Projects
export const getClientProjects = async (clientId) => {
    const response = await axios.get(`${API_URL}/clients/${clientId}/projects/`);
    return response.data;
};

export const createClientProject = async (clientId, project) => {
    const response = await axios.post(`${API_URL}/clients/${clientId}/projects/`, project);
    return response.data;
};

export const updateClientProject = async (clientId, projectId, project) => {
    const response = await axios.put(`${API_URL}/clients/${clientId}/projects/${projectId}`, project);
    return response.data;
};

export const deleteClientProject = async (clientId, projectId) => {
    await axios.delete(`${API_URL}/clients/${clientId}/projects/${projectId}`);
};

// Funzioni per Service Recommendations
export const getServiceRecommendations = async (clientId) => {
    const response = await axios.get(`${API_URL}/clients/${clientId}/recommendations/`);
    return response.data;
};

export const createServiceRecommendation = async (clientId, recommendation) => {
    const response = await axios.post(`${API_URL}/clients/${clientId}/recommendations/`, recommendation);
    return response.data;
};

export const updateServiceRecommendation = async (clientId, recommendationId, recommendation) => {
    const response = await axios.put(`${API_URL}/clients/${clientId}/recommendations/${recommendationId}`, recommendation);
    return response.data;
};

export const deleteServiceRecommendation = async (clientId, recommendationId) => {
    await axios.delete(`${API_URL}/clients/${clientId}/recommendations/${recommendationId}`);
};

// Funzioni per le Views
export const getRecommendationsView = async () => {
    const response = await axios.get(`${API_URL}/recommendations-view/`);
    return response.data;
};

export const getSuccessStoriesView = async () => {
    const response = await axios.get(`${API_URL}/success-stories-view/`);
    return response.data;
};
