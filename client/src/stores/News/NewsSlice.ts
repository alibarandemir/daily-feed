import { createSlice } from "@reduxjs/toolkit";


interface NewsState {
    news: { id: string; title: string; content: string }[];  // Örnek haber yapısı
    status: 'idle' | 'loading' | 'succeeded' | 'failed';  // Yükleme durumu
    error: string | null;  // Hata mesajı
  }
  
  // Initial state
  const initialState: NewsState = {
    news: [],
    status: 'idle',
    error: null,
  };

const NewsSlice= createSlice({
    name:'news',
    initialState:initialState,
    reducers:{}

})



export default NewsSlice.reducer