import { createSlice } from "@reduxjs/toolkit"
import { all } from "axios"
import { getCategories, updateUserCategories } from "./actions"

const initialState={
    userCategories:[],
    allCategories:[],
    loading:false,
    message:'',
    error:null
}
const CategorySlice = createSlice({

    name: 'category',
    initialState: initialState,
    reducers: {
       
    },
    extraReducers:(builder)=>{
        builder.addCase(getCategories.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getCategories.fulfilled,(state,action)=>{
            state.loading=false
            state.allCategories=action.payload.allCategories
            state.userCategories=action.payload.userCategories
        })
        builder.addCase(getCategories.rejected,(state)=>{
            state.loading=false
        })
        builder.addCase(updateUserCategories.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(updateUserCategories.fulfilled,(state,action)=>{
            state.loading=false
           
            state.userCategories=action.payload.userCategories
            state.message=action.payload.message
            
        })
        builder.addCase(updateUserCategories.rejected,(state)=>{
            state.loading=false
        })
    }

    
})

export default CategorySlice.reducer