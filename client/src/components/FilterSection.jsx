// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { filterRecipes } from "../slices/recipeSlice";

// const FilterSection = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [tagSearchTerm, setTagSearchTerm] = useState("");
//   const [isTagInputFocused, setIsTagInputFocused] = useState(false);
//   const allTags = useSelector((state) => state.recipes.allTags);

//   const dispatch = useDispatch();

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     dispatch(filterRecipes({ searchTerm: e.target.value, tags: selectedTags }));
//   };

//   const handleTagSearchChange = (e) => {
//     setTagSearchTerm(e.target.value);
//   };

//   const handleTagClick = (tag) => {
//     console.log("called");
//     const updatedTags = selectedTags.includes(tag)
//       ? selectedTags.filter((t) => t !== tag)
//       : [...selectedTags, tag];
//     setSelectedTags(updatedTags);
//     console.log(selectedTags);
//     setTagSearchTerm(""); // Clear tag search term after selection
//     dispatch(filterRecipes({ searchTerm, tags: updatedTags }));
//   };

//   const handleTagInputFocus = () => {
//     setIsTagInputFocused(true);
//   };

//   const handleTagInputBlur = () => {
//     setTimeout(() => setIsTagInputFocused(false), 100);
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg w-full">
//       <h3 className="text-xl font-semibold mb-4">Filter Recipes</h3>
//       <input
//         type="text"
//         placeholder="Search by recipe name..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <div>
//         <h4 className="font-medium mb-2">Selected Tags:</h4>
//         <div className="flex flex-wrap mb-4">
//           {selectedTags.map((tag) => (
//             <button
//               key={tag}
//               onClick={() => handleTagClick(tag)}
//               className="m-1 px-3 py-1 border rounded-full bg-blue-500 text-white"
//             >
//               {tag}
//             </button>
//           ))}
//         </div>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search and select tags..."
//             value={tagSearchTerm}
//             onChange={handleTagSearchChange}
//             onFocus={handleTagInputFocus}
//             onBlur={handleTagInputBlur}
//             className="w-full p-2 border rounded"
//           />
//           {isTagInputFocused && (
//             <div className="absolute left-0 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-10">
//               {allTags
//                 .filter((tag) =>
//                   tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
//                 )
//                 .map((tag) => (
//                   <div
//                     key={tag}
//                     onClick={() => handleTagClick(tag)}
//                     className={`cursor-pointer p-2 ${
//                       selectedTags.includes(tag)
//                         ? "bg-blue-500 text-white"
//                         : "bg-white hover:bg-gray-200"
//                     }`}
//                   >
//                     {tag}
//                   </div>
//                 ))}
//               {allTags.filter((tag) =>
//                 tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
//               ).length === 0 && (
//                 <div className="p-2 text-gray-500">No tags found</div>
//               )}
//             </div>
//           )}
//         </div>
//         {/* Render the selected tags visibly below the search bar */}
//         {selectedTags.length > 0 && (
//           <div className="mt-4 ">
//             <h4 className="font-medium mb-2">Currently Selected Tags:</h4>
//             <div className="flex flex-wrap">
//               {selectedTags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="m-1 px-3 py-1 border rounded-full bg-blue-200 text-blue-700"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterSection;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes } from "../slices/recipeSlice";

const FilterSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const allTags = useSelector((state) => state.recipes.allTags);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(filterRecipes({ searchTerm: e.target.value, tags: selectedTags }));
  };

  const handleTagSearchChange = (e) => {
    setTagSearchTerm(e.target.value);
  };

  const handleTagClick = (tag) => {
    console.log("Tag clicked:", tag);
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    setIsTagInputFocused(false);
    setTagSearchTerm(""); // Clear tag search term after selection
    dispatch(filterRecipes({ searchTerm, tags: updatedTags }));
  };

  const handleTagInputFocus = () => {
    setIsTagInputFocused(true);
  };

  // Removed onBlur to prevent dropdown from closing too soon

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full">
      <h3 className="text-xl font-semibold mb-4">Filter Recipes</h3>
      <input
        type="text"
        placeholder="Search by recipe name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded mb-4"
      />
      <div>
        <h4 className="font-medium mb-2">Selected Tags:</h4>
        <div className="flex flex-wrap mb-4">
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="m-1 px-3 py-1 border rounded-full bg-slate-700 text-white"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search and select tags..."
            value={tagSearchTerm}
            onChange={handleTagSearchChange}
            onFocus={handleTagInputFocus}
            className="w-full p-2 border rounded"
          />
          {isTagInputFocused && (
            <div
              className="absolute left-0 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-10"
              onBlur={() => setIsTagInputFocused(false)}
            >
              {allTags
                .filter((tag) =>
                  tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
                )
                .map((tag) => (
                  <div
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`cursor-pointer p-2 ${
                      selectedTags.includes(tag)
                        ? "bg-slate-700 text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              {allTags.filter((tag) =>
                tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
              ).length === 0 && (
                <div className="p-2 text-gray-500">No tags found</div>
              )}
            </div>
          )}
        </div>
        {/* Render the selected tags visibly below the search bar */}
        {/* {selectedTags.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Currently Selected Tags:</h4>
            <div className="flex flex-wrap">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="m-1 px-3 py-1 border rounded-full bg-blue-200 text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FilterSection;
