import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecipeCard from "./RecipeCard";

const AllRecipes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageRecipes, setCurrentPageRecipes] = useState([]);
  const filteredRecipes = useSelector((state) => state.recipes.filteredRecipes);

  const recipesPerPage = 6;
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  useEffect(() => {
    // Calculate the start and end index for the current page
    const startIdx = currentPage * recipesPerPage;
    const endIdx = startIdx + recipesPerPage;

    // Slice the filteredRecipes array to get only the recipes for the current page
    const currPageRecipes = filteredRecipes.slice(startIdx, endIdx);
    setCurrentPageRecipes(currPageRecipes);
  }, [filteredRecipes, currentPage]);

  const handleNextPageClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="m-5 mt-1 flex flex-col justify-center content-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full ">
        {currentPageRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipeData={recipe} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPageClick}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 rounded-l-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPageClick}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-gray-300 rounded-r-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllRecipes;
