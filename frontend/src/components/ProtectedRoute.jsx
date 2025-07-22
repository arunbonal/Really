import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApiData } from "../contexts/ApiContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useApiData();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated and not loading, redirect immediately
    if (!isLoading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-8">
            Please sign in to access this feature
          </p>
          <button 
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 