import { api } from "@/config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";




export const getResourcesforSideBar=createAsyncThunk('sources/sidebar',async(data,{rejectWithValue})=>{
        try{
            const response= await api.get('/getResourcesForSidebar')
            console.log(response.data.sources)
            return response.data
        }
        catch(error:any){
            console.error(error.message)
            return rejectWithValue(error.message)
        }
})
export const getPreferences=createAsyncThunk('getPreferences',async({},{rejectWithValue})=>{
    try{
        const response= await api.get('getPreferences',{withCredentials:true})
        console.log('getPreferences')
        console.log("preferences:"+response.data)
        return response.data
    }
    catch(error:any){
        console.error(error.message)
        return rejectWithValue(error.message)
    }
})
export const changePreferences=createAsyncThunk('changePreferences',async(data:{preferencesKey:string,value:string|boolean},{rejectWithValue})=>{
    try{
        const response= await api.put('changePreferences',data,{withCredentials:true})
    
        return response.data
    }
    catch(error:any){
        console.error(error.message)
        return rejectWithValue(error.message)
    }
})