import React from "react";
import Hero from "../../components/Hero";
import { useApiData } from "../../contexts/ApiContext";

const Beauty = () => {
  const { user, login } = useApiData();

  return (
    <div>
      <Hero
        scanText="Scan barcode"
        scanLink={user ? "/product/beauty/scan" : "#"}
        searchText="Search for beauty products"
        onScanClick={user ? undefined : login}
        requireAuth={!user}
      />
    </div>
  );
};

export default Beauty;
