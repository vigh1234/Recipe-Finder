import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const APP_ID = "71fdf483";
const APP_KEY = "47e87807df21af002cd0a6ed85ae66c8";

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    return response.data.hits;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipeList: [],
    searchQuery: '',
    status: 'idle',
    favorites: [],
  },
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(recipe => recipe.uri !== action.payload.uri);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipeList = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { updateSearchQuery, addToFavorites, removeFromFavorites } = recipeSlice.actions;

export default recipeSlice.reducer;
