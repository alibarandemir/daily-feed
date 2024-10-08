import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation';



export default function ProtectedRoute(Wrapper:any) {
    useEffect(()=>{
        const isAuth= useAuth();
        if(!isAuth){
            redirect('/login')
        }
    },[])
  return (
    <Wrapper/>
  
  )
}