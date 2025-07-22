import { createContext, useContext, useState, useEffect } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [detectedText, setDetectedText] = useState("");
  const [currentMenu, setCurrentMenu] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check user authentication status
  const checkUser = async () => {
    try {
      const response = await fetch(`${backendUrl}/auth/user`, {
        method: "GET",
        credentials: "include", 
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    
    // Set up an interval to check user status every 30 seconds
    const intervalId = setInterval(checkUser, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const login = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };

  const logout = async () => {
    try {
      await fetch(`${backendUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      // Clear any stored data
      setApiData(null);
      setDetectedText("");
      setCurrentMenu("");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the request fails, clear the local state
      setUser(null);
      setApiData(null);
      setDetectedText("");
      setCurrentMenu("");
    }
  };

  const value = {
    apiData,
    setApiData,
    detectedText,
    setDetectedText,
    currentMenu,
    setCurrentMenu,
    user,
    isLoading,
    login,
    logout,
    checkUser,
  };

  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
};

export const useApiData = () => useContext(ApiDataContext);
