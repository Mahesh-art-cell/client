

// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// // ✅ Add Axios Interceptor to Attach Token Automatically
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = async (inputs) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8800/api/auth/login",
//         inputs,
//         { withCredentials: true }
//       );

//       const { user, token } = res.data;
//       if (!user || !token) throw new Error("Invalid login response");

//       setCurrentUser(user);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);
//       return user;
//     } catch (err) {
//       console.error("❌ Login Error:", err.response?.data || err.message);
//       throw err.response?.data || { error: "Login failed. Please try again." };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:8800/api/auth/logout", {}, {
//         withCredentials: true,
//       });
//       setCurrentUser(null);
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     } catch (err) {
//       console.error("❌ Logout Error:", err);
//     }
//   };

//   // ✅ Add this
//   const updateProfile = (updatedUser) => {
//     setCurrentUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, updateProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// 📁 src/context/authContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Attach token to every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Login
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        { withCredentials: true }
      );
      const { user, token } = res.data;

      if (!user || !token) {
        throw new Error("Invalid response from server");
      }

      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      throw err.response?.data || "Login failed.";
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, {
        withCredentials: true,
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.error("❌ Logout Error:", err);
    }
  };

  // ✅ Update profile (without logging out or breaking token)
  const updateProfile = (updatedFields) => {
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
