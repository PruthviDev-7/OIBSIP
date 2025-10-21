// Authentication Context - Manages user login state across the entire app
// This allows all components to know if user is logged in and who they are

import React, { createContext, useEffect, useState } from 'react';

// Create context with default empty values
export const AuthContext = createContext({ user: null, token: null, login: (t,u)=>{}, logout: ()=>{} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(()=>{
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
  },[token]);
  useEffect(()=>{
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  },[user]);

  const login = (newToken, newUser) => { setToken(newToken); setUser(newUser); };
  const logout = () => { setToken(null); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
