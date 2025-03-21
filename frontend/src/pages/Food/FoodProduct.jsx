import React from "react";
import { useApiData } from "../../contexts/ApiContext";

const FoodProduct = () => {
  const { apiData } = useApiData();

  return (
    <div>
      {apiData ? (
        <h2>
          {apiData.product.brands} {apiData.product.product_name}
        </h2>
      ) : (
        <p>No product scanned yet.</p>
      )}
    </div>
  );
};

export default FoodProduct;
