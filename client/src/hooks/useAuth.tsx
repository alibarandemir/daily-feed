'use client'
import { api } from '@/config/axios'
import React, { useEffect, useState } from 'react'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Başlangıçta null
  const [loading, setLoading] = useState(true); // Yüklenme durumu ekleniyor

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/verifyToken', { withCredentials: true }); // Token doğrulama
      const { isAuthenticated } = response.data;
      setIsAuthenticated(isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Doğrulama işlemi tamamlandığında yüklenme durumunu kapat
    }
  };

  return { isAuthenticated, loading };
};

export default useAuth;
