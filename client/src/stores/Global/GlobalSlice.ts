import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState{
    isSideBarCollapsed:boolean,
    isDarkMode:boolean
}
const initalState:GlobalState={
    isSideBarCollapsed:false,
    isDarkMode:false
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