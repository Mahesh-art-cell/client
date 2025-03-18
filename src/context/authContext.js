// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   // ✅ Function to Login
//   const login = async (inputs) => {
//     try {
//       const res = await axios.post(
//         "https://server-wi41.onrender.com/api/auth/login",
//         inputs,
//         { withCredentials: true }
//       );

//       setCurrentUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       return res.data;
//     } catch (err) {
//       throw err.response?.data || "Login failed. Please try again.";
//     }
//   };

//   // ✅ Function to Logout


//   // ✅ Function to Update User Profile
//   const update = async (inputs) => {
//     if (!currentUser) return;

//     try {
//       const res = await axios.put(
//         `https://server-wi41.onrender.com/api/users/${currentUser?._id}`,
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



// context/authContext.js


import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Function to Login
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "https://server-wi41.onrender.com/api/auth/login",
        inputs,
        { withCredentials: true }
      );

      setCurrentUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (err) {
      throw err.response?.data || "Login failed. Please try again.";
    }
  };

  // ✅ Function to Logout
  // ✅ Updated logout function in AuthContext.js
  const logout = async () => {
    try {
      console.log("⚡ Attempting to log out...");
      await axios.post(
        "https://server-wi41.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("✅ Logout API success!");
      setCurrentUser(null); // ✅ Clear user
      localStorage.removeItem("user");
    } catch (err) {
      console.error("❌ Logout Error:", err);
    }
  };
  


  // ✅ Function to Update User Profile
  const update = async (inputs) => {
    if (!currentUser) return;

    try {
      const res = await axios.put(
        `https://server-wi41.onrender.com/api/users/${currentUser.id}`,
        inputs,
        { withCredentials: true }
      );

      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      throw err.response?.data || "Update failed. Please try again.";
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};
