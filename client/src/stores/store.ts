import { configureStore } from '@reduxjs/toolkit'
import GlobalReducer from './Global/GlobalSlice'
import NewsReducer from './News/NewsSlice'
import ResourceReducer from './Resource/ResourceSlice'
import AuthReducer from './Auth/AuthSlice'
import UserReducer from './User/UserSlice'



const store= configureStore({
    reducer:{
        global:GlobalReducer,
        news:NewsReducer,
        source:ResourceReducer,
        auth:AuthReducer,
        user:UserReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;