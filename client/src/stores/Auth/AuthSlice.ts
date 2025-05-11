import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, logout, register, resetPassword, verifyEmail } from "./actions";



interface AuthState {
      // Hata mesajı
      success:boolean
      loading:boolean,
      error:string|null,
      message:string|null
      isLogIn:boolean|null
  }
  
  // Initial state
  const initialState: AuthState = {
    success:false,
    loading:false,
    error: null,
    message:null,
    isLogIn:null
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
          
      },
      resetIsLogIn:(state)=>{
        state.isLogIn=null
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
        state.isLogIn=true
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
        state.isLogIn=true
      })
      builder.addCase(login.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
      builder.addCase(logout.pending,(state,action)=>{
        state.loading=true;
      })
      builder.addCase(logout.fulfilled,(state,action)=>{
        localStorage.removeItem("userName")
        state.loading=false;
        state.success=action.payload.success
        state.message=action.payload.message
       
      })
      builder.addCase(logout.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
      builder.addCase(forgotPassword.pending,(state,action)=>{
        state.loading=true;
      })
      builder.addCase(forgotPassword.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=action.payload.success
        state.message=action.payload.message
       
      })
      builder.addCase(forgotPassword.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
      builder.addCase(resetPassword.pending,(state,action)=>{
        state.loading=true;
      })
      builder.addCase(resetPassword.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=action.payload.success
        state.message=action.payload.message
       
      })
      builder.addCase(resetPassword.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||""
        state.success=false
      })
        
    }

})


export const { resetAuthState,resetIsLogIn } = AuthSlice.actions;
export default AuthSlice.reducer