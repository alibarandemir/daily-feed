import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/config/axios";



export const getAllResources= createAsyncThunk('getResources', async ({page}:{page:number},{rejectWithValue})=>{
    try{
        
        const result= await api.get(`/getAllResources?page=${page}`)
        console.log(result.data)
        return result.data

    }
    catch(e:any){
        console.error(rejectWithValue(e.message))
    }
    

})