import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../slices/recipeSlice";
import { Link } from "react-router-dom";
import FilterSection from "./FilterSection";
import AllRecipes from "./AllRecipes";

const Home = () => {
  const status = useSelector((state) => state.recipes.status);
  const featuredRecipes = useSelector((state) => state.recipes.featured);
  const [sliderIndex, setSliderIndex] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  const nextSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === featuredRecipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === 0 ? featuredRecipes.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="mt-3 pt-24 sm:pt-16 w-full  h-full">
      <section className="flex flex-col items-center justify-center">
        <div className="relative w-[95%] h-1/2 overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {featuredRecipes.length > 0 && (
              <div
                key={featuredRecipes[sliderIndex]._id}
                className="w-full flex-shrink-0 flex flex-col items-center p-4 relative group "
              >
                <img
                  src={featuredRecipes[sliderIndex].image}
                  alt={featuredRecipes[sliderIndex].name}
                  className="h-72 w-full object-cover rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-75"
                />
                <div className="absolute bottom-3 left-0 w-full p-4 rounded-b-lg">
                  <h3 className="text-xl font-semibold text-white text-center">
                    {featuredRecipes[sliderIndex].name}
                  </h3>
                  <Link
                    to={`/recipes/${featuredRecipes[sliderIndex]._id}`}
                    className="mt-2 text-white text-center block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            )}
          </div>
          <button
            className="absolute top-1/2 left-5 transform -translate-y-1/2 hover:border-2 hover:border-white text-white px-2 py-1 rounded-md"
            onClick={prevSlide}
          >
            Prev
          </button>
          <button
            className="absolute top-1/2 right-5 transform -translate-y-1/2 hover:border-2 hover:border-white text-white px-2 py-1 rounded-md"
            onClick={nextSlide}
          >
            Next
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-5 sm:flex-row mt-8 m-5">
        <div className="md:w-1/4 w-full">
          <FilterSection />
        </div>
        <div className="md:w-3/4 ">
          <AllRecipes />
        </div>
      </section>
    </section>
  );
};

export default Home;
