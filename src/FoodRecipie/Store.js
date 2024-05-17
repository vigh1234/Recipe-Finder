import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './RecipeSlice';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export default store;
