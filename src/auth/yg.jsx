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







import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SchoolAuthContext } from '../context/SchoolAuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(SchoolAuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Basic password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>School Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="school@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};




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







export const api = {
    checkSession: async () => {
      const response = await fetch('http://localhost:4000/auth/check-session', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Session check failed');
      return response.json();
    },
  
    login: async (email, password) => {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      return response.json();
    },
  
    logout: async () => {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Logout failed');
      return response.json();
    },
  
    getSchoolData: async (schoolId) => {
      const response = await fetch(`http://localhost:4000/schools/${schoolId}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch school data');
      return response.json();
    }
  };