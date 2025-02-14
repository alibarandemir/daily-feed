'use client'

import { api } from "@/config/axios";
import store from "@/stores/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function Home() {
  useEffect(()=>{
    const fetchData=async()=>{
      const result= await api.get('getPreferences')
      if(result.data.success){
        localStorage.setItem('preferences',result.data.preferences)
      }
      return
      
    }
    fetchData()
  },[])
//redirect 
  return (
    <Provider store={store}>
      <></>
    </Provider>
    
  );
}
