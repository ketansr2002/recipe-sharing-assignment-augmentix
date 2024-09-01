import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "Medium",
    cuisine: "",
    caloriesPerServing: "",
    tags: "",
    image: "",
    mealType: [],
    rating: 0,
    reviewCount: 0,
  });

  const mealTypeOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Snack",
    "Dessert",
    "Side Dish",
    "Appetizer",
    "Beverage",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMealTypeChange = (e) => {
    const { options } = e.target;
    const selectedMealTypes = [];
    for (const option of options) {
      if (option.selected) {
        selectedMealTypes.push(option.value);
      }
    }
    setFormData({ ...formData, mealType: selectedMealTypes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      ingredients: formData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions: formData.instructions
        .split(".")
        .map((instruction) => instruction.trim())
        .filter(Boolean),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await axios.post(
        "http://localhost:3030/api/recipes",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Recipe created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe.");
    }
  };

  return (
    <section>
      <div className="w-3/4 mx-auto pt-28 sm:pt-24 bg-white rounded-lg">
        <div className="bg-slate-700 py-2 mb-3 text-white h-full rounded-t-md">
          <h2 className="text-2xl font-bold text-center mb-4">
            Create a New Recipe
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mx-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Ingredients <span className="font-normal">(Comma Separated)</span>
            </label>
            <textarea
              rows={3}
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Instructions{" "}
              <span className="font-normal">(Separate By Periods)</span>
            </label>
            <textarea
              rows={5}
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Prep Time <span className="font-normal">(Minutes)</span>
              </label>
              <input
                type="number"
                name="prepTimeMinutes"
                value={formData.prepTimeMinutes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Cook Time <span className="font-normal">(Minutes)</span>
              </label>
              <input
                type="number"
                name="cookTimeMinutes"
                value={formData.cookTimeMinutes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Servings
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Cuisine
            </label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Calories per Serving
            </label>
            <input
              type="number"
              name="caloriesPerServing"
              value={formData.caloriesPerServing}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Tags <span className="font-normal">(Comma Separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Meal Type{" "}
              <span className="font-normal">(Can select Multiple)</span>
            </label>
            <select
              name="mealType"
              multiple
              value={formData.mealType}
              onChange={handleMealTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {mealTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-b-md"
          >
            Create Recipe
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
