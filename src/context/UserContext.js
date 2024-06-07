import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    id: 1,
    firstName: 'dsa',
    lastName: 'dsa',
    username: 'DDDD',
    email: 'dsa',
    gender: 'dsa',
    password: 'dsa',
    confirmPassword: 'dsa',
    picture: null,
});
  const [user, setUser] = useState(formData);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
