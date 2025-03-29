// import { createContext, useEffect, useState } from "react";

// export const DarkModeContext = createContext();

// export const DarkModeContextProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(
//     JSON.parse(localStorage.getItem("darkMode")) ?? false // ✅ Handle null case
//   );

//   const toggle = () => {
//     setDarkMode((prev) => !prev); // ✅ Toggle properly
//   };

//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode)); // ✅ Store as JSON string
//   }, [darkMode]);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggle }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };


import { createContext, useEffect, useState } from "react";

// ✅ Create Dark Mode Context
export const DarkModeContext = createContext();

// ✅ Get Initial Theme from Local Storage or Default to Light Mode
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "dark";
};

// ✅ Dark Mode Provider
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialTheme());

  // ✅ Toggle Dark/Light Mode
  const toggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // ✅ Apply Theme and Store in Local Storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
