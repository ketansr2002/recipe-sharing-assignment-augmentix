import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// writing async logic for fetching api data
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const recipeData = await axios
      .get("http://www.localhost:3030/api/recipes")
      .then((response) => response.data);

    return recipeData;
  }
);

const initialState = {
  recipes: [],
  featured: [],
  filteredRecipes: [],
  allTags: [],
  status: "idle",
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    filterRecipes: (state, action) => {
      const { searchTerm, tags } = action.payload;
      const filteredRecipes = state.recipes.filter(
        (recipe) =>
          (searchTerm
            ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true) &&
          (tags.length > 0
            ? tags.every((tag) => recipe.tags.includes(tag))
            : true)
      );

      return { ...state, filteredRecipes };
    },
    updateRecipes: (state, action) => {
      const { id, updatedRecipe } = action.payload;

      // Find the index of the recipe to update

      const index = state.recipes.findIndex((recipe) => recipe._id === id);
      if (index !== -1) {
        state[index] = updatedRecipe; // Mutating the draft directly
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.featured = action.payload
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        const alltags = state.recipes.map((doc) => doc.tags).flat();
        const uniq = [...new Set(alltags)];
        state.allTags = uniq;
        state.filteredRecipes = state.recipes;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterRecipes, updateRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
