import React from "react";
import Hero from "../../components/Hero";

const Beauty = () => {
  return (
    <div>
      <Hero
        scanText="Scan barcode"
        scanLink="/product/beauty/scan"
        searchText="Search for beauty products"
      />
    </div>
  );
};

export default Beauty;
