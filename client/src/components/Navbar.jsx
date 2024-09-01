import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu visibility
  const handleHamburger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed  top-0 left-0 w-full bg-slate-800 text-white shadow-md z-50 rounded-b-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center">
          <img
            src="logo1.jpg"
            alt="Logo"
            className="h-10 rounded-md opacity-90 "
          />
          <span className="ml-3 text-2xl font-semibold">Hot-Cook</span>
        </Link>
        <ul className="sm:flex space-x-6 ml-7 text-white">
          <li>
            <Link to="/addrecipe" className="hover:text-gray-400">
              Add Recipe
            </Link>
          </li>
        </ul>
        <button className="md:hidden text-white" onClick={handleHamburger}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col space-y-2 p-4 bg-gray-800 text-white">
          <li>
            <Link
              to="/addrecipe"
              className="block hover:bg-gray-700 p-2 rounded"
            >
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
