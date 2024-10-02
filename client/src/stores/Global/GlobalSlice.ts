import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState{
    isSideBarCollapsed:boolean,
    isDarkMode:boolean
    sideBarSources:SideBarSources[]
    
}
interface SideBarSources {
    sourceName:string,
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
    }
    
})



export const {changeDarkMode,setIsSideBarCollapsed}= GlobalSlice.actions
export default GlobalSlice.reducer;