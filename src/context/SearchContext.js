import { createContext, useState, useContext } from "react";

// ✅ Create Search Context
const SearchContext = createContext();

// ✅ Search Provider
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

// ✅ Custom Hook to Use Search Context
export const useSearch = () => {
  return useContext(SearchContext);
};
    