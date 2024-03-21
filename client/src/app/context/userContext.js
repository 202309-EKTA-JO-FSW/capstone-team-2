"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    let userData = localStorage.getItem('userInfo');
     setUser(userData ? JSON.parse(userData) : null);
},[])

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);