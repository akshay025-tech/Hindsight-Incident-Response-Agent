import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getIncidents = async () => {
  const response = await API.get("/incidents");
  return response.data;
};

export const getIncident = async (id) => {
  const response = await API.get(`/incidents/${id}`);
  return response.data;
};

export const analyzeIncident = async (id) => {
  const response = await API.post(`/agents/analyze/${id}`);
  return response.data;
};

export const approveAction = async (id) => {
  const response = await API.post(`/actions/${id}/approve`);
  return response.data;
};

export const executeAction = async (id) => {
  const response = await API.post(`/actions/${id}/execute`);
  return response.data;
};

export const getPostmortem = async (id) => {
  const response = await API.get(`/postmortems/${id}`);
  return response.data;
};

export default API;