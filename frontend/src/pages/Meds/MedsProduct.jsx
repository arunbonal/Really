import React from "react";
import { useApiData } from "../../contexts/ApiContext";

const MedsProduct = () => {
  const { detectedText } = useApiData();

  return (
    <div>
      {detectedText ? <h2>{detectedText}</h2> : <p>No meds scanned yet.</p>}
    </div>
  );
};

export default MedsProduct;
