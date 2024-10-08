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