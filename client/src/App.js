import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import AddRecipe from "./components/AddRecipe";
import "./output.css";
import SingleRecipe from "./components/SingleRecipe";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<SingleRecipe />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
