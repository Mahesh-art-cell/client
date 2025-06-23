



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { DarkModeProvider } from "./context/darkModeContext";
import { SearchProvider } from "./context/SearchContext"; // ✅ Import SearchProvider

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <DarkModeProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </DarkModeProvider>
    </AuthProvider>
 
);
