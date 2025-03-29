


// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// // export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   // ✅ Function to Login
//   // ✅ Updated login function
// const login = async (inputs) => {
//   try {
//     const res = await axios.post(
//       "https://server-wi41.onrender.com/api/auth/login",
//       inputs,
//       { withCredentials: true }
//     );

//     const { user, token } = res.data; // Extract user & token

//     setCurrentUser(user); // Store user in context
//     localStorage.setItem("user", JSON.stringify(user)); // Store user data
//     localStorage.setItem("token", token); // ✅ Store token in localStorage

//     return user;
//   } catch (err) {
//     throw err.response?.data || "Login failed. Please try again.";
//   }
// };


//   // ✅ Function to Logout
//   // ✅ Updated logout function in AuthContext.js
//   const logout = async () => {
//     try {
//       console.log("⚡ Attempting to log out...");
//       await axios.post(
//         "https://server-wi41.onrender.com/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       console.log("✅ Logout API success!");
//       setCurrentUser(null); // ✅ Clear user
//       localStorage.removeItem("user");
//     } catch (err) {
//       console.error("❌ Logout Error:", err);
//     }
//   };
  

//   // ✅ Updated Logout Function



//   // ✅ Function to Update User Profile
//   const update = async (inputs) => {
//     if (!currentUser) return;

//     try {
//       const res = await axios.put(
//         `https://server-wi41.onrender.com/api/users/${currentUser.id}`,
//         inputs,
//         { withCredentials: true }
//       );

//       setCurrentUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       return res.data;
//     } catch (err) {
//       throw err.response?.data || "Update failed. Please try again.";
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, update }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// ✅ Add Axios Interceptor to Attach Token Automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Login Function
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "https://server-wi41.onrender.com/api/auth/login",
        inputs,
        { withCredentials: true }
      );

      // ✅ Debugging Response
      console.log("📢 Login Response:", res.data);

      const { user, token } = res.data;
      if (!user || !token) {
        throw new Error("Invalid response format");
      }

      // ✅ Store User and Token in Local Storage
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return user;
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      throw err.response?.data || "Login failed. Please try again.";
    }
  };

  // ✅ Logout Function
  const logout = async () => {
    try {
      await axios.post("https://server-wi41.onrender.com/api/auth/logout", {}, {
        withCredentials: true,
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.error("❌ Logout Error:", err);
    }
  };

  // ✅ Persist User in Local Storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




