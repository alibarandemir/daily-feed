import verifyToken from '@/utils/veriyToken'
import React, { useEffect, useState } from 'react'

type Props = {}

const useAuth = async() => {
  const [isAuthenticated,setIsAuthenticated]= useState<boolean>(false)
  const isVerifiedToken= await verifyToken()
  useEffect(()=>{
    const token='ddff'
    if(!token){
      setIsAuthenticated(false)
      return 
    }
    
    if(isVerifiedToken){
      setIsAuthenticated(true)
    }
    else{
      setIsAuthenticated(false)
    }
  },[])
  
  return isAuthenticated
}


export default useAuth
