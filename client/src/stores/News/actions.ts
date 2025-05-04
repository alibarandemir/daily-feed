import { api } from "@/config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNews= createAsyncThunk('news/getNews',async (offset:number,{rejectWithValue})=>{
    try{
        const response= await api.get('/getNews',{
            params:{
                offset:offset
            },withCredentials:true
        },)
        console.log("haberler",response.data)
        return response.data;
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})

export const getNewsByCategoryName= createAsyncThunk('/getNewsByCategoryName',async(data:{categoryName:string;offset:number},{rejectWithValue})=>{
    try{
        const response= await api.get('/getNewsByCategoryName',{
            params:{
                categoryName:data.categoryName,
                offset:data.offset
            }
        })
        console.log(response.data)
        return response.data;
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})
export const getNewsBySourceName= createAsyncThunk('getNewsBySourceName',async(data: { sourceName: string; offset: number },{rejectWithValue})=>{
    try{
        console.log(data.sourceName)
        const response= await api.get('getNewsBySourceName',{
            params:{
                sourceName:data.sourceName,
                offset:data.offset
            }
        })
        console.log(response.data)
        return response.data;
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})


//haber arama
export const searchNews= createAsyncThunk('search',async(data:{query:string,offset:number},{rejectWithValue})=>{
    try{
        console.log(data.query)
        const response= await api.get(`search?offset=${data.offset}&q=${data.query}`
        )
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})
export const getSavedNews= createAsyncThunk('getSavedNews',async(offset:number,{rejectWithValue})=>{
    try{
        const response= await api.get(`getSavedNews`,{
           params: {
                offset:offset
            
        },withCredentials:true}
        )
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})
export const getUserFeed=createAsyncThunk('getUserFeed',async({page}:{page:number}, {rejectWithValue})=>{ 
    try{
        console.log(page+"actionun içinde")
        const response= await api.get('getUserFeed',{
            params:{
                page:page
            },withCredentials:true
        },)
        console.log(response.data)
        return response.data;
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }   
})