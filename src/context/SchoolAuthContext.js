import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const SchoolAuthContext = createContext(null);

export const SchoolAuthProvider = ({ children }) => {
  const [currentSchool, setCurrentSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await api.checkSession();
        setCurrentSchool(data.school);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      setCurrentSchool(data.school);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Invalid email or password'
      };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setCurrentSchool(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SchoolAuthContext.Provider value={{ currentSchool, login, logout, loading }}>
      {children}
    </SchoolAuthContext.Provider>
  );
};