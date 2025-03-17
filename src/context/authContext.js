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

      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      throw err.response?.data || "Login failed. Please try again.";
    }
  };

  // ✅ Function to Logout
  const logout = async () => {
    try {
      await axios.post("https://server-wi41.onrender.com/api/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  // ✅ Function to Update User Profile
  const update = async (inputs) => {
    if (!currentUser) return;

    try {
      const res = await axios.put(
        `https://server-wi41.onrender.com/api/users/${currentUser?._id}`,
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
