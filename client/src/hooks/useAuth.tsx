'use client'
import { api } from '@/config/axios'
import verifyToken from '@/utils/veriyToken'
import React, { useEffect, useState } from 'react'

type Props = {}

const useAuth = () => {
  const [isAuthenticated,setIsAuthenticated]= useState<boolean | null>(false)
  
  useEffect(()=>{
    
    checkAuth()
   
  },[])
  const checkAuth=async ()=>{
    // const token= 'ff'
    // //burada cookiesden token var mı yok mu konrolünü yap
    // if(!token){
    //   setIsAuthenticated(false)
    //   return 
    // }
    // const isVerifiedToken= await verifyToken()
    const response= await api.get('/verifyToken')//burada backende istek atıp token doğrulatacaksın
    const {isAuthenticated}=response.data
    if(isAuthenticated){
      setIsAuthenticated(true)
    }
    else{
      setIsAuthenticated(false)
    }

  }
  return (isAuthenticated)
}


export default useAuth
