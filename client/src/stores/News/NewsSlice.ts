import { createSlice } from "@reduxjs/toolkit";
import { getNews, getNewsByCategoryName, getNewsBySourceName,  getSavedNews,  getUserFeed,  searchNews } from "./actions";


interface NewsState {
    news: {id:string,title: string, link:string,description:string,image:string,
      upvote:number,downvote:number,sourceName:string,categoryName:string,summary:string,actions:string[],createdDate:string,isHot:boolean }[];  // Örnek haber yapısı
    loading:boolean,
    error: string | null,
    hasMore:boolean  // Hata mesajı
  }
  
  // Initial state
  const initialState: NewsState = {
    news: [],
    loading:false,
    error: null,
    hasMore:true
  };

const NewsSlice= createSlice({
    name:'news',
    initialState:initialState,
    reducers:{
      
    },
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
          console.log(action.error.message)
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
        builder.addCase(getSavedNews.pending,(state,action)=>{
          state.loading=true;
        })
        builder.addCase(getSavedNews.fulfilled,(state,action)=>{
          state.loading=false;
          state.news=action.payload.news
        })
        builder.addCase(getSavedNews.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.message||""
        })
        builder.addCase(getUserFeed.pending,(state,action)=>{
          state.loading=true;
        })
        builder.addCase(getUserFeed.fulfilled,(state,action)=>{
          state.loading=false;
          state.news = [...state.news, ...action.payload.news]
          state.hasMore=action.payload.hasMore  
         
        })
        builder.addCase(getUserFeed.rejected,(state,action)=>{
          state.loading=false;
         
        })
        
        
    }

})



export default NewsSlice.reducer