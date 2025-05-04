'use client'
import { api } from '@/config/axios'
import React, { useEffect, useState } from 'react'


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/verifyToken', { withCredentials: true });
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) { 
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAuthenticated, loading };
};

export default useAuth;
