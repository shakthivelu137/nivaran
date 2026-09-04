import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nv_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const login = (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  return api.post("/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const getMe = () => api.get("/auth/me");

// Symptoms
export const getCommonSymptoms = () => api.get("/symptoms/common");
export const analyzeSymptoms = (symptoms) =>
  api.post("/symptoms/analyze", { symptoms });

// History
export const getHistory = () => api.get("/history/");
export const deleteHistory = (id) => api.delete(`/history/${id}`);

export default api;
