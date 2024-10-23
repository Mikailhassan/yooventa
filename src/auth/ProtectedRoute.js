import React, { useContext } from 'react';
import { SchoolAuthContext } from '../context/SchoolAuthContext';
import { LoginPage } from './LoginPage';

export const ProtectedRoute = ({ children }) => {
  const { currentSchool, loading } = useContext(SchoolAuthContext);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!currentSchool) {
    return <LoginPage />;
  }
  
  return children;
};