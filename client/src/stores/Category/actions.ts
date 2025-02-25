import { api } from "@/config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk('category/getCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('getCategories', { withCredentials: true });
        console.log(response.data);
        return response.data;
    } catch (e: any) {
        return rejectWithValue(e.response.data);
    }
});

interface UpdateUserCategoriesPayload {
    selectedCategories: number[];
}

export const updateUserCategories = createAsyncThunk('category/updateUserCategories', async ({selectedCategories}: UpdateUserCategoriesPayload, { rejectWithValue }) => {
    try {
        console.log(selectedCategories);
        const response = await api.post('updateUserCategories', { 
            selectedCategories
        }, { withCredentials: true });
        console.log(response.data);
        return response.data;
    } catch (e: any) {
        return rejectWithValue(e.response.data);
    }
});
