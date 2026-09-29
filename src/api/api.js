import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getIncidents = async() => {
    const response = await API.get("/incidents");
    return response.data;
};

export const createIncident = async(incident) => {
    const response = await API.post("/incidents", incident);
    return response.data;
};

export const getIncident = async(id) => {
    const response = await API.get(`/incidents/${id}`);
    return response.data;
};

export const analyzeIncident = async(id) => {
    const response = await API.post(`/agents/analyze/${id}`);
    return response.data;
};

export const approveAction = async(id) => {
    const response = await API.post(`/actions/${id}/approve`);
    return response.data;
};

export const executeAction = async(id) => {
    const response = await API.post(`/actions/${id}/execute`);
    return response.data;
};

export const getPostmortem = async(id) => {
    const response = await API.get(`/postmortems/${id}`);
    return response.data;
};

export const getMemories = async() => {
    const response = await API.get("/memory/recall");
    return response.data;
};

export default API;