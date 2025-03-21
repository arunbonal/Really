import React from "react";
import Hero from "../../components/Hero";

const Meds = () => {
  return (
    <div>
      <Hero
        scanText="Scan a medicine"
        scanLink="/product/meds/scan"
        searchText="Search for a medicine"
      />
    </div>
  );
};

export default Meds;
