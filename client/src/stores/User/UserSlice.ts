import { createSlice } from "@reduxjs/toolkit"
import { saveNews, voteNews } from "./actions";



const initalState = {
    loading:false,
    success:false,
    error:null,
    savedNews:[],
    myFeed:[],
    message:null
}

const UserSlice= createSlice({
    name:'user',
    initialState:initalState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(voteNews.pending,(state,action)=>{
            state.loading=true;
          })
          builder.addCase(voteNews.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message
            
          })
          builder.addCase(voteNews.rejected,(state,action)=>{
            state.loading=false;
           
          })
          builder.addCase(saveNews.pending,(state,action)=>{
            state.loading=true;
          })
          builder.addCase(saveNews.fulfilled,(state,action)=>{
            state.loading=false;
           
          })
          builder.addCase(saveNews.rejected,(state,action)=>{
            state.loading=false;
           
          })
    }
   
    
})

export const { } = UserSlice.actions

export default UserSlice.reducer