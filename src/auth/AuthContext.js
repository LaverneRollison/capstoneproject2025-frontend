// src/auth/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const { token: tkn, userId, name, email: userEmail, role } = res.data;
      setToken(tkn);
      setUser({ id: userId, name, email: userEmail, role });
      return { success: true };
    } catch (err) {
      console.error('Login error', err);
      return { success: false, message: err?.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      const res = await api.post('/api/auth/register', { name, email, password });
      const { token: tkn, userId, name: n, email: userEmail, role } = res.data;
      setToken(tkn);
      setUser({ id: userId, name: n, email: userEmail, role });
      return { success: true };
    } catch (err) {
      console.error('Signup error', err);
      return { success: false, message: err?.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
