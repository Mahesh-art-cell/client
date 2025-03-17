import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Function to update user details
  const update = async (inputs) => {
    try {
      const res = await axios.put(
        `https://mern-project-o20y.onrender.com/api/users/${currentUser?._id}`,
        inputs,
        {
          withCredentials: true,
        }
      );

      setCurrentUser(res.data); // ✅ Update the user state
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Store user in localStorage

      return res.data;
    } catch (err) {
      throw err.response?.data || "Update failed. Please try again.";
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, update }}>
      {children}
    </UserContext.Provider>
  );
};
