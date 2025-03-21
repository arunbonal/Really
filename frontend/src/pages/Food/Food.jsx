import React from "react";
import Hero from "../../components/Hero";
import CategoryGrid from "../../components/CategoryGrid";
import foodCategories from "../../data/FoodCategories";

const Food = () => {
  return (
    <div>
      <Hero
        scanText="Scan barcode"
        scanLink="/product/food/scan"
        searchText="Search for packaged Foods"
      />
      <hr className="mt-12 text-gray-300 " />
      <CategoryGrid categories={foodCategories} />
    </div>
  );
};

export default Food;
