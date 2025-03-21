
// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: "https://server-wi41.onrender.com",
//   withCredentials: true,  // ✅ Ensures cookies are sent
// });



import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://server-wi41.onrender.com/api", // ✅ Correct backend URL
  withCredentials: true, // ✅ Send cookies along with requests
});

// ✅ Add Authorization Header
makeRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
