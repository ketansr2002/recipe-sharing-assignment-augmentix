const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  getAllTags,
  getRecipeBySearch,
  saveRecipe,
  updateRecipe,
} = require("../controller/recipeController");

router.route("/recipes").get(getAllRecipes).post(saveRecipe);
router.route("/recipes/:id").get(getRecipeById).put(updateRecipe);
router.route("/tags").get(getAllTags);
router.route("/search").get(getRecipeBySearch);

module.exports = router;
