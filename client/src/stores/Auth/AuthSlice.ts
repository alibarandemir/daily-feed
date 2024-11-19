import { createSlice } from "@reduxjs/toolkit";
import { login, register, verifyEmail } from "./actions";



interface AuthState {
      // Hata mesajı
      success:boolean
      loading:boolean,
      error:string|null,
      message:string|null
  }
  
  // Initial state
  const initialState: AuthState = {
    success:false,
    loading:false,
    error: null,
    message:null
  };

const AuthSlice= createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
      resetAuthState:(state)=>{
          state.error=null,
          state.loading=false
          state.message=null
          state.success=false
      }
    },
    extraReducers:(builder)=>{
      builder.addCase(register.pending,(state,action)=>{
        state.loading=true;
      })
      builder.addCase(register.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=action.payload.success
        state.message=action.payload.message
      })
      builder.addCase(register.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
      builder.addCase(verifyEmail.pending,(state,action)=>{
        state.loading=true;
      })
      builder.addCase(verifyEmail.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=action.payload.success
        state.message=action.payload.message
      })
      builder.addCase(verifyEmail.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
      builder.addCase(login.pending,(state,action)=>{
        state.loading=true;
      })
      builder.addCase(login.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=action.payload.success
        state.message=action.payload.message
      })
      builder.addCase(login.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
        
    }

})


export const { resetAuthState } = AuthSlice.actions;
export default AuthSlice.reducer