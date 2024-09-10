import { configureStore } from '@reduxjs/toolkit'
import GlobalReducer from './Global/GlobalSlice'



const store= configureStore({
    reducer:{
        global:GlobalReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;