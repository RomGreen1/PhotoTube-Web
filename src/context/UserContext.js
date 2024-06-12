import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context for user authentication
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize the user state as null (no user logged in by default)
  const [user, setUser] = useState(null);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData); // Set the user state with the provided user data
  };

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear the user state
    navigate('/signin'); // Navigate to the sign-in page
  };

  // Provide the user state and authentication functions to the context consumers
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
