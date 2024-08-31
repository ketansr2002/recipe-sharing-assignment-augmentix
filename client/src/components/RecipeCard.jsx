import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipeData }) => {
  const { name, image, tags, cuisine, rating, _id } = recipeData;

  return (
    <div className="max-w-xs rounded-lg shadow-lg bg-white flex flex-col m-2 mt-0 pt-0 h-full">
      {image && name && (
        <img
          src={image}
          alt={name}
          className="w-full rounded-t-lg object-cover"
        />
      )}
      <div className="flex-grow p-4">
        {name && <h1 className="text-xl font-semibold mb-2">{name}</h1>}
        <p className="font-thin text-sm">
          <h5 className="font-semibold inline-block mr-2">Tags:</h5>
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs mr-2 mb-2 inline-block"
            >
              {tag}
            </span>
          ))}
        </p>
        <p className="font-thin text-sm">
          <h5 className="font-semibold inline-block mr-2">Cuisine:</h5>
          <span>{cuisine}</span>
        </p>
        <p className=" text-sm">
          <h5 className="font-semibold inline-block mr-2">Rating:</h5>
          <span>{rating}</span>
        </p>
      </div>
      <div className="mt-auto">
        <Link
          to={`/recipes/${_id}`}
          className="block mx-4 mb-4 px-4 py-2 bg-slate-600 text-white text-center rounded-lg hover:bg-slate-800 transition duration-300"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
