import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getIncidents = async () => {
    const response = await API.get('/incidents');
    return response.data;
};

export const getIncident = async (id) => {
    const response = await API.get(`/incidents/${id}`);
    return response.data;
};

export const createIncident = async (incident) => {
    const response = await API.post('/incidents', incident);
    return response.data;
};

export const simulateIncident = async () => {
    const response = await API.post('/incidents/simulate');
    return response.data;
};

export const updateIncident = async (id, changes) => {
    const response = await API.patch(`/incidents/${id}`, changes);
    return response.data;
};

export const decideApproval = async (id, decision) => {
    const response = await API.post(`/incidents/${id}/approval`, { decision });
    return response.data;
};

export const analyzeIncident = async (id) => {
    const response = await API.post(`/agents/analyze/${id}`);
    return response.data;
};

export const getMemories = async (query = '') => {
    const response = await API.get('/memory/recall', { params: { query } });
    return response.data;
};

export const reflectMemory = async () => {
    const response = await API.post('/memory/reflect');
    return response.data;
};

export const getPostmortem = async (id) => {
    const response = await API.get(`/postmortems/${id}`);
    return response.data;
};

export const generatePostmortem = async (id) => {
    const response = await API.post(`/postmortems/${id}`);
    return response.data;
};

export const savePostmortem = async (id, postmortem) => {
    const response = await API.put(`/postmortems/${id}`, postmortem);
    return response.data;
};

export default API;
