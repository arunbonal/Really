import React from "react";
import Hero from "../../components/Hero";
import { useApiData } from "../../contexts/ApiContext";

const Meds = () => {
  const { user, login } = useApiData();

  return (
    <div>
      <Hero
        scanText="Scan a medicine"
        scanLink={user ? "/product/meds/scan" : "#"}
        searchText="Search for a medicine"
        onScanClick={user ? undefined : login}
        requireAuth={!user}
      />
    </div>
  );
};

export default Meds;
