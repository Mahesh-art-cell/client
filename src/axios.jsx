
// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: "https://server-wi41.onrender.com",
//   withCredentials: true,  // ✅ Ensures cookies are sent
// });





// // axios.js
// import axios from "axios";

// // ✅ Get token from localStorage or cookies
// const token = localStorage.getItem("token");

// export const makeRequest = axios.create({
//   baseURL: "https://server-wi41.onrender.com/api", // ✅ Backend URL
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: token ? `Bearer ${token}` : "", // ✅ Add token dynamically
//   },
// });



// axios.js or inside Share.jsx
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://server-wi41.onrender.com/api", // ✅ Correct Backend URL
  withCredentials: true, // ✅ Include credentials (cookies/JWT)
  headers: {
    "Content-Type": "application/json",
  },
});
