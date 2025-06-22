import axios from "axios";

const backendAPI = import.meta.env.VITE_BACKEND_CONNECTION;

const apiClient = axios.create({
  baseURL: backendAPI,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default apiClient;
