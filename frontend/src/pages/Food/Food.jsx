import React from "react";
import Hero from "../../components/Hero";
import CategoryGrid from "../../components/CategoryGrid";
import foodCategories from "../../data/FoodCategories";
import { useApiData } from "../../contexts/ApiContext";

const Food = () => {
  const { user, login } = useApiData();

  return (
    <div>
      <Hero
        scanText="Scan barcode"
        scanLink={user ? "/product/food/scan" : "#"}
        searchText="Search for packaged Foods"
        onScanClick={user ? undefined : login}
        requireAuth={!user}
      />
      <hr className="mt-12 text-gray-300 " />
      <CategoryGrid categories={foodCategories} />
    </div>
  );
};

export default Food;
