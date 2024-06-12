import React, { createContext, useState } from 'react';

// Create a context for search functionality
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // Initialize the search query state as an empty string
  const [searchQuery, setSearchQuery] = useState('');

  // Provide the search query state and its setter function to the context consumers
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
