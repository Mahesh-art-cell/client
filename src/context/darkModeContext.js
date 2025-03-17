import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? false // ✅ Handle null case
  );

  const toggle = () => {
    setDarkMode((prev) => !prev); // ✅ Toggle properly
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode)); // ✅ Store as JSON string
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
