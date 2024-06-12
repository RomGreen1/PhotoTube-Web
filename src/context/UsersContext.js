import React, { createContext, useState } from 'react';

// Create a context for managing users
export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  // Initialize the users state as an empty array
  const [users, setUsers] = useState([]);
  // Initialize the ID state with the first ID value
  const [id, setId] = useState(1);

  // Function to add a new user
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, { ...user, id }]); // Add user with unique ID
    setId(id + 1); // Update the ID for the next user
  };

  // Function to get a user by username
  const getUser = (username) => {
    return users.find((user) => user.username === username); // Find user by username
  };

  // Provide the users state and user management functions to the context consumers
  return (
    <UsersContext.Provider value={{ users, addUser, getUser }}>
      {children}
    </UsersContext.Provider>
  );
};
