import { api } from "@/config/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

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
        const response= await api.post(`/verifyEmail`,{code})
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