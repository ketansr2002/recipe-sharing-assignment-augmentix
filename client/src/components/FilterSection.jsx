import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes } from "../slices/recipeSlice";

const FilterSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const allTags = useSelector((state) => state.recipes.allTags);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(filterRecipes({ searchTerm: e.target.value, tags: selectedTags }));
  };

  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    dispatch(filterRecipes({ searchTerm, tags: updatedTags }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full">
      <h3 className="text-xl font-semibold mb-4">Filter Recipes</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded mb-4"
      />
      <div>
        <h4 className="font-medium mb-2">Filter by Tags:</h4>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`m-1 px-3 py-1 border rounded-full ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
