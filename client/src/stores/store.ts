import { configureStore } from '@reduxjs/toolkit'
import GlobalReducer from './Global/GlobalSlice'
import NewsReducer from './News/NewsSlice'
import ResourceReducer from './Resource/ResourceSlice'
import AuthReducer from './Auth/AuthSlice'
import UserReducer from './User/UserSlice'
import CategoryReducer from './Category/CategorySlice'



const store= configureStore({
    reducer:{
        global:GlobalReducer,
        news:NewsReducer,
        source:ResourceReducer,
        auth:AuthReducer,
        user:UserReducer,
        category:CategoryReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;