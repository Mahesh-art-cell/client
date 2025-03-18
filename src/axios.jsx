
// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: "https://server-wi41.onrender.com",
//   withCredentials: true,  // ✅ Ensures cookies are sent
// });

import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://server-wi41.onrender.com/api", // ✅ Correct Backend URL
  withCredentials: true,
});









