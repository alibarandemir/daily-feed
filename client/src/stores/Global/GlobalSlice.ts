import { createSlice } from "@reduxjs/toolkit";
import { getResourcesforSideBar } from "./actions";

export interface GlobalState{
    isSideBarCollapsed:boolean,
    isDarkMode:boolean
    sideBarSources:SideBarSources[]
    
}
interface SideBarSources {
    id:number
    name:string,
    sourceImg:string
}
const initalState:GlobalState={
    isSideBarCollapsed:false,
    isDarkMode:false,
    sideBarSources:[]
}
const GlobalSlice= createSlice({
    name:'global',
    initialState:initalState,
    reducers:{
        changeDarkMode:(state)=>{
            state.isDarkMode=!state.isDarkMode
        },
        setIsSideBarCollapsed:(state)=>{
            state.isSideBarCollapsed= !state.isSideBarCollapsed
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getResourcesforSideBar.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.sideBarSources=action.payload.sources
        })
    }
})



export const {changeDarkMode,setIsSideBarCollapsed}= GlobalSlice.actions
export default GlobalSlice.reducer;