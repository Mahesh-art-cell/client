

// import axios from "axios";

// const makeRequest = axios.create({
//   // baseURL: "http://localhost:8800/api",
//   baseURL: "https://server-wi41.onrender.com/api",
//   withCredentials: true, // only if your backend uses cookies
// });

// // ✅ Interceptor to attach token dynamically before every request
// makeRequest.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// console.log("📦 Token from localStorage:", localStorage.getItem("token"));



import axios from "axios";

const makeRequest = axios.create({
  // baseURL: "http://localhost:8800/api",
  baseURL: "https://server-wi41.onrender.com/api",
  
  withCredentials: true, // needed for cookies if used
});

// ✅ Automatically attach token from localStorage
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


export { makeRequest };
