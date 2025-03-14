import { api } from "@/config/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface formDataType{
    name?:string,
    surname?:string,
    email:string,
    password:string
}

export const register= createAsyncThunk('/register',async(data:formDataType,{rejectWithValue})=>{
    try{
        console.log(data)
        const response= await api.post(`/register`,data)
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})

export const verifyEmail= createAsyncThunk('/verifyEmail',async(code:string,{rejectWithValue})=>{
    try{
        console.log(code)
        const response= await api.post(`/verifyEmail`,{code},{withCredentials:true})
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})

export const login= createAsyncThunk('/login',async(data:formDataType,{rejectWithValue})=>{
    try{
        const response= await api.post(`/login`,data,{withCredentials:true})
        console.log(response.data)
        localStorage.setItem("userName",response.data.user)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})

export const logout=createAsyncThunk('/logout',async()=>{

    try{
        const response= await api.post(`/logout`,null,{withCredentials:true})
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return 
    }
})

export const forgotPassword=createAsyncThunk('/forgotPassword',async(email:string)=>{

    try{
        const response=await api.post('/forgotPassword',{email})
        return response.data;
    }
    catch(e){

    }
})

export const resetPassword = createAsyncThunk(
    "/resetPassword",
    async ({ token, newPassword }: { token: string | null; newPassword: string }, { rejectWithValue }) => {
      try {
        const response = await api.post("/resetPassword", { token, newPassword });
        return response.data;
      } catch (error: any) {
        console.error("Şifre sıfırlama hatası:", error);
  
        // Sunucudan gelen hata mesajını almak için
        return rejectWithValue(error.response?.data?.message || "Bilinmeyen bir hata oluştu.");
      }
    }
  );