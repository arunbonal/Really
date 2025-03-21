import { createContext, useContext, useState } from "react";

const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [detectedText, setDetectedText] = useState("");
  const [currentMenu, setCurrentMenu] = useState("");

  const value = {
    apiData,
    setApiData,
    detectedText,
    setDetectedText,
    currentMenu,
    setCurrentMenu,
  };

  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
};

export const useApiData = () => useContext(ApiDataContext);
