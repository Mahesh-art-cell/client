
// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: "https://server-wi41.onrender.com",
//   withCredentials: true,  // ✅ Ensures cookies are sent
// });



import axios from "axios";

// ✅ Create Axios Instance with Token from Local Storage
export const makeRequest = axios.create({
  baseURL: "https://server-wi41.onrender.com/api",
  withCredentials: true, // ✅ Ensures cookies are sent
});

// ✅ Add Interceptor to Attach Token Automatically
makeRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ Attach token to header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
