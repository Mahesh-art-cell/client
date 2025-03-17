
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://server-wi41.onrender.com/api",
  withCredentials: true,  // ✅ Ensures cookies are sent
});






