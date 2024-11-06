import { createSlice } from "@reduxjs/toolkit";
import { getNews, getNewsByCategoryName, getNewsBySourceName, searchNews } from "./actions";


interface NewsState {
    news: {title: string, link:string,description:string,image:string,
      upvote:number,downvote:number,sourceName:string,categoryName:string,summary:string }[];  // Örnek haber yapısı
    loading:boolean,
    error: string | null;  // Hata mesajı
  }
  
  // Initial state
  const initialState: NewsState = {
    news: [],
    loading:false,
    error: null,
  };

const NewsSlice= createSlice({
    name:'news',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getNews.pending,(state,action)=>{
          state.loading=true;
        })
        builder.addCase(getNews.fulfilled,(state,action)=>{
          state.loading=false;
          state.news=action.payload.news
        })
        builder.addCase(getNews.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.message||""
        })
        builder.addCase(getNewsBySourceName.pending,(state,action)=>{
          state.loading=true;
        })
        builder.addCase(getNewsBySourceName.fulfilled,(state,action)=>{
          state.loading=false;
          state.news=action.payload.news
        })
        builder.addCase(getNewsBySourceName.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.message||""
        })
        builder.addCase(getNewsByCategoryName.pending,(state,action)=>{
          state.loading=true;
        })
        builder.addCase(getNewsByCategoryName.fulfilled,(state,action)=>{
          state.loading=false;
          state.news=action.payload.news
        })
        builder.addCase(getNewsByCategoryName.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.message||""
        })
        builder.addCase(searchNews.pending,(state,action)=>{
          state.loading=true;
        })
        builder.addCase(searchNews.fulfilled,(state,action)=>{
          state.loading=false;
          state.news=action.payload.news
        })
        builder.addCase(searchNews.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.message||""
        })
        
    }

})



export default NewsSlice.reducer