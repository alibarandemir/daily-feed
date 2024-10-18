import {  createSlice } from "@reduxjs/toolkit"
import { getAllResources } from "./actions"
import { sources } from "next/dist/compiled/webpack/webpack"
interface SourceType{
    sources:{name:string,sourceImg:string}[]
    loading:boolean
    hasMore:boolean
}
const initialState:SourceType={
    sources:[],
    loading:false,
    hasMore:true

}

const SourceSlice= createSlice({
    name:'source',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllResources.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getAllResources.fulfilled,(state,action)=>{
            const newSources = action.payload.sources.filter(
                (newSource:any) => !state.sources.some((existingSource) => existingSource.name === newSource.name)
            );
            state.sources=[...state.sources,...newSources]
            console.log(state.sources)
            state.loading=false
            state.hasMore= action.payload.hasMore
            
        })
        .addCase(getAllResources.rejected, (state) => {
            state.loading = false;
          });
    }
})

export default SourceSlice.reducer

