import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { updateRecipes } from "../slices/recipeSlice"; // Adjust the import path as needed
import axios from "axios";

const EditRecipeModal = ({ isOpen, onClose, recipe, setRecipe }) => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    tags: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || "",
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        tags: recipe.tags || [],
      });
    }
  }, [recipe]); // Dependency array only includes 'recipe'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...recipe,
        name: formData.name,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        tags: formData.tags,
      };

      const updatedRecipe = await axios.put(
        `http://localhost:3030/api/recipes/${recipe._id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(
        updateRecipes({ id: recipe._id, updatedRecipe: updatedRecipe.data })
      );
      alert("Recipe Updated sucessfully");
      onClose();
      setRecipe(updatedRecipe.data); // Update parent state if necessary
    } catch (error) {
      console.error("Error updating recipe:", error.message);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed mt-16 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Recipe Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="ingredients"
            >
              Ingredients (comma separated)
            </label>
            <input
              id="ingredients"
              name="ingredients"
              type="text"
              value={formData.ingredients.join(", ")}
              onChange={(e) => handleArrayChange(e, "ingredients")}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="instructions"
            >
              Instructions (comma separated)
            </label>
            <input
              id="instructions"
              name="instructions"
              type="text"
              value={formData.instructions.join(", ")}
              onChange={(e) => handleArrayChange(e, "instructions")}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags.join(", ")}
              onChange={(e) => handleArrayChange(e, "tags")}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditRecipeModal;
