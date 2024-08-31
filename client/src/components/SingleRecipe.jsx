import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditRecipeModal from "../components/EditRecipeModal";

const SingleRecipe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/api/recipes/${id}`
        );
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err.message);
      }
    };

    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  if (!recipe) {
    return <div className="mt-3 pt-16 w-full text-center">...loading</div>;
  }

  return (
    <section className="mt-3 pt-16 w-full max-w-5xl mx-auto p-4">
      <Link to={"/"}>
        <p className="text-center mt-2">
          ⬅️<span>All Recipes</span>
        </p>
      </Link>
      <h1 className="text-4xl font-bold text-center my-6 mt-3">
        {recipe.name}
      </h1>

      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recipe Details</h2>
          <p className="mb-2">
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p className="mb-2">
            <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
          </p>
          <p className="mb-2">
            <strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes
          </p>
          <p className="mb-2">
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p className="mb-2">
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount}{" "}
            reviews)
          </p>
          <p className="mb-2">
            <strong>Tags:</strong>{" "}
            <span className="inline-flex flex-wrap">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 bg-slate-600 text-white px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div className="flex justify-center mt-5 mb-0">
        <button
          onClick={handleEditClick}
          className="mx-4 mb-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Edit
        </button>
        <button className="mx-4 mb-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-300">
          Delete
        </button>
      </div>
      <EditRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={recipe}
        setRecipe={setRecipe}
      />
    </section>
  );
};

export default SingleRecipe;
