

import axios from "axios";

// Create Axios instance
export const makeRequest = axios.create({
  // baseURL: "http://localhost:8800/api",
  baseURL: "https://server-wi41.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor to attach token dynamically before every request
makeRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




console.log("📦 Token from localStorage:", localStorage.getItem("token"));
