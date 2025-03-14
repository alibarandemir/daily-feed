'use client';

import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/showToast';
import Loading from './Loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuth(); 
  const router = useRouter(); 

  useEffect(() => {
    console.log(isAuth)
    if (isAuth.isAuthenticated === false) {
      showToast('error', 'Bu sayfaya erişmek için giriş yapmalısınız');
      router.push('/login'); 
    }
  }, [isAuth, router]);

  if (isAuth.isAuthenticated === null) {
    return <Loading />;
  }

  return <>{children}</>; 
}
