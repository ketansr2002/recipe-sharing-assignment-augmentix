const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

// get all recipes
const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// get particular recipes
const getRecipeById = async (req, res) => {
  try {
    // Extract the recipe ID from request parameters
    const recipeId = req.params.id;

    // Validate and convert the ID
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).send("Invalid recipe ID format.");
    }

    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).send("Recipe not found.");
    }

    // Send the recipe data
    res.status(200).json(recipe);
  } catch (error) {
    // Handle errors (e.g., database connection issues)
    res.status(500).send(error.message);
  }
};

// get recipe by tags
const getRecipeBySearch = async (req, res) => {
  try {
    // Extract search query from request
    const { query } = req.query;

    // Ensure the query parameter is provided
    if (!query) {
      return res.status(400).send("Search query is required.");
    }

    // Build search query using a regular expression
    const searchQuery = new RegExp(query, "i"); // 'i' for case-insensitive search

    // Find recipes that match the search query in any of the fields
    const recipeData = await Recipe.find({
      $or: [
        { name: searchQuery },
        { ingredients: searchQuery },
        { tags: searchQuery },
      ],
    });

    // Send the search results
    res.status(200).json(recipeData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all recipe Tags
const getAllTags = async (req, res, next) => {
  try {
    const allTags = await Recipe.find({}, "tags");

    // Extract and flatten tags if necessary
    const flattenedTags = allTags.map((doc) => doc.tags).flat();
    const uniq = [...new Set(flattenedTags)];
    res.status(200).json(uniq); // Send the flattened tags
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// save a recipe
const saveRecipe = async (req, res) => {
  try {
    // Extract recipe data from the request body
    const recipeData = req.body;

    // Optional: Validate the recipe data (e.g., ensure required fields are present)
    if (!recipeData.name || !recipeData.ingredients) {
      return res.status(400).send("Recipe name and ingredients are required.");
    }

    // Create a new recipe instance
    const newRecipe = new Recipe(recipeData);

    // Save the recipe to the database
    const savedRecipe = await newRecipe.save();

    // Send the saved recipe data
    res.status(201).json(savedRecipe);
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    res.status(500).send(error.message);
  }
};

// update a recipe
const updateRecipe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRecipe = req.body;
    console.log(id, updatedRecipe);

    // Check for a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Invalid Recipe Id");
    }

    // Update the recipe
    const updateDocument = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
      new: true,
      runValidators: true,
    });

    // If no document is found with the given id
    if (!updateDocument) {
      return res.status(404).send("Recipe not found");
    }

    // Send the updated document
    res.status(200).json(updateDocument);
  } catch (error) {
    // Handle any other error
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getAllRecipes,
  getRecipeById,
  getAllTags,
  getRecipeBySearch,
  saveRecipe,
  updateRecipe,
};
