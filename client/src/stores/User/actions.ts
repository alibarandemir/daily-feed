import { api } from "@/config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


//haber oy verme
export const voteNews= createAsyncThunk('vote',async(data:{newsLink:string,type:string},{rejectWithValue})=>{
    try{
        const response= await api.post(`voteNews`,{
           
                type:data.type,
                newsLink:data.newsLink
            
        },{withCredentials:true}
        )
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})

//haber kaydetme
export const saveNews= createAsyncThunk('save',async(newsLink:string,{rejectWithValue})=>{
    try{
        const response= await api.post(`saveNews`,{
           
                newsLink:newsLink
            
        },{withCredentials:true}
        )
        console.log(response.data)
        return response.data
    }
    catch(e:any){
        return rejectWithValue(e.response?.data)
    }
})





