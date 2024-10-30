import { api } from "@/config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";





export const getNews= createAsyncThunk('news/getNews',async (offset:number,{rejectWithValue})=>{
    try{
        const response= await api.get('getNews',{
            params:{
                offset:offset
            }
        })
        console.log(response.data)
        return response.data;
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})
export const getNewsByCategoryName= createAsyncThunk('getNewsByCategoryName',async(data,{rejectWithValue})=>{
    try{
        const response= await api.get('getNewsByCategoryName',{
            params:{
                
            }
        })
        console.log(response.data)
        return response.data;
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})