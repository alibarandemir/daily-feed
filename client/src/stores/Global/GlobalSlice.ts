import { createSlice } from "@reduxjs/toolkit";
import { changePreferences, getPreferences, getResourcesforSideBar } from "./actions";

export interface GlobalState{
    isSideBarCollapsed:boolean,
    isDarkMode:boolean
    sideBarSources:SideBarSources[],
    isModalVisible:boolean, // Kullanıcıyı üzen gösteren modalın açık olup olmadığını kontrol eder.
    preferences:Record<string,any>
    
}
interface SideBarSources {
    id:number,
    name:string,
    sourceImg:string
}
const savedPreferences = localStorage.getItem("preferences");
const parsedPreferences = savedPreferences ? JSON.parse(savedPreferences) : {};
const initalState:GlobalState={
    isSideBarCollapsed:false,
    isDarkMode:false,
    sideBarSources:[],
    isModalVisible:false,
    preferences:parsedPreferences
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
        },
        toggleModal:(state)=>{
            state.isModalVisible=!state.isModalVisible
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getResourcesforSideBar.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.sideBarSources=action.payload.sources
        })
        builder.addCase(getPreferences.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.preferences = action.payload;
            localStorage.setItem('preferences', JSON.stringify(action.payload));
        })
        builder.addCase(changePreferences.fulfilled,(state,action)=>{
            state.preferences = { ...state.preferences, ...action.payload };
            localStorage.setItem("preferences", JSON.stringify(state.preferences));
        })
    }
})



export const {changeDarkMode,setIsSideBarCollapsed,toggleModal}= GlobalSlice.actions
export default GlobalSlice.reducer;