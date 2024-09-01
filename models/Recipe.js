const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    ingredients: {
      type: [String], // Array of strings
      required: true,
    },
    instructions: {
      type: [String], // Array of strings
      required: true,
    },
    prepTimeMinutes: {
      type: Number,
    },
    cookTimeMinutes: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"], // Enum for difficulty levels
    },
    cuisine: {
      type: String,
    },
    caloriesPerServing: {
      type: Number,
    },
    tags: {
      type: [String], // Array of strings
    },

    image: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
    },
    mealType: {
      type: [String], // Array of strings
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snacks",
        "Snack",
        "Dessert",
        "Side Dish",
        "Appetizer",
        "Beverage",
      ], // Enum for meal types
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
