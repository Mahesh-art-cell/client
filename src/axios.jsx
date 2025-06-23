


// import axios from "axios";

// // ✅ Get token from localStorage or cookies
// const token = localStorage.getItem("token");

// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8800/api", // ✅ Local backend URL
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: token ? `Bearer ${token}` : "", // ✅ Add token dynamically
//   },
// });


// import axios from "axios";

// // Create Axios instance
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8800/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
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


import axios from "axios";

const makeRequest = axios.create({
  // baseURL: "http://localhost:8800/api",
  baseURL: "https://server-wi41.onrender.com/api",
  withCredentials: true, // only if your backend uses cookies
});

// Add token from localStorage or AuthContext to headers
makeRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or get it from context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { makeRequest };
