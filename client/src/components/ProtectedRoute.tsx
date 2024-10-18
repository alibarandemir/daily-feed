'use client';

import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuth(); 
  console.log(isAuth)
  const router = useRouter(); 

  useEffect(() => {
    console.log(isAuth)
    if (!isAuth) {
      router.push('/login'); 
    }
  }, [isAuth, router]);

  if (isAuth==null) {
    return <div>Yükleniyor</div> 
  }

  return children; 
}
