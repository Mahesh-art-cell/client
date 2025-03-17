
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://mern-project-o20y.onrender.com/api",
  withCredentials: true,  // ✅ Ensures cookies are sent
});






