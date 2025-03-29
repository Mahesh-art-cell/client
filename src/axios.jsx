



import axios from "axios";

// ✅ Get token from localStorage or cookies
const token = localStorage.getItem("token");

export const makeRequest = axios.create({
  baseURL: "https://server-wi41.onrender.com/api", // ✅ Backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "", // ✅ Add token dynamically
  },
});
