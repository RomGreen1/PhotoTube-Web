import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context for user authentication
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize the user state as null (no user logged in by default)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      // Fetch user details from your server using the stored token if needed
      // For example:
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:1324/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userDetails = await response.json();
            setUser(userDetails);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching is done
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false); // Set loading to false if no userId or token is found
    }
  }, []);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData); // Set the user state with the provided user data
    setLoading(false);
  };

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/signin'); // Navigate to the sign-in page
  };

  // Provide the user state and authentication functions to the context consumers
  return (
    <UserContext.Provider value={{ user, login,setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
