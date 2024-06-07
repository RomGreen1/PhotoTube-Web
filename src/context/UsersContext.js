import React, { createContext, useState } from 'react';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(1);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, { ...user, id }]);
    setId(id + 1); // Update the ID for the next user
  };
  const getUser = (username) => {
    return users.find((user) => user.username === username);
  };

  return (
    <UsersContext.Provider value={{ users, addUser,getUser }}>
      {children}
    </UsersContext.Provider>
  );
};



