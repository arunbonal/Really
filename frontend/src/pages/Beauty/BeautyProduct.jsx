import React from "react";
import { useApiData } from "../../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

const BeautyProduct = () => {
  const { apiData } = useApiData();
  const navigate = useNavigate();

  if (!apiData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">
            No Product Scanned
          </h2>
          <p className="text-gray-600 mb-8">
            Please scan a beauty product barcode to view its information
          </p>
          <button 
            onClick={() => navigate("/product/beauty/scan")}
            className="scan-button"
          >
            Scan Product
          </button>
        </div>
      </div>
    );
  }

  const product = apiData.product;
  
  // Get beauty rating and color
  const getBeautyRating = () => {
    if (!product.beauty_rating) return "Unknown";
    return product.beauty_rating;
  };

  const getBeautyColor = (rating) => {
    const colors = {
      1: 'rating-e',
      2: 'rating-d',
      3: 'rating-c',
      4: 'rating-b',
      5: 'rating-a'
    };
    return colors[rating] || 'rating-c';
  };

  const beautyRating = getBeautyRating();
  const beautyColor = getBeautyColor(beautyRating);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Scanner
        </button>

        {/* Product Header */}
        <div className="glass-effect p-8 rounded-3xl mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="text-center lg:text-left">
              {product.image_front_url ? (
                <img 
                  src={product.image_front_url} 
                  alt={product.product_name}
                  className="w-64 h-64 mx-auto lg:mx-0 object-contain rounded-2xl shadow-lg"
                />
              ) : (
                <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🧴</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  {product.product_name}
                </h1>
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.generic_name || "Beauty product information"}
              </p>

              {/* Beauty Rating Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`rating-badge ${beautyColor} text-lg px-6 py-3`}>
                    Rating {beautyRating}/5
                  </div>
                </div>
                
                {/* Rating Comment */}
                <div className="bg-white/70 p-4 rounded-xl border-l-4 border-pink-500">
                  <h3 className="font-bold text-lg mb-2">Safety Assessment</h3>
                  <p className="text-gray-700 mb-2">
                    {beautyRating >= 4 ? "Excellent - Safe ingredients" : 
                     beautyRating >= 3 ? "Good - Mostly safe" :
                     beautyRating >= 2 ? "Fair - Some concerns" : "Poor - Multiple concerns"}
                  </p>
                </div>
              </div>

              {/* Barcode */}
              <div className="bg-white p-4 rounded-xl">
                <div className="text-sm text-gray-500 mb-1">Barcode</div>
                <div className="font-mono text-lg">{product.code}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        {product.all_ingredients && product.all_ingredients.length > 0 && (
          <div className="glass-effect p-8 rounded-3xl mb-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Ingredients Analysis</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Good Ingredients */}
              {product.good_ingredients && product.good_ingredients.length > 0 && (
                <div>
                  <h3 className="font-semibold text-green-600 mb-3">✅ Good Ingredients</h3>
                  <div className="space-y-2">
                    {product.good_ingredients.map((ingredient, index) => (
                      <div key={index} className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concerning Ingredients */}
              {product.concerning_ingredients && product.concerning_ingredients.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-600 mb-3">⚠️ Concerning Ingredients</h3>
                  <div className="space-y-2">
                    {product.concerning_ingredients.map((ingredient, index) => (
                      <div key={index} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm">
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* All Ingredients */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 mb-3">📋 All Ingredients</h3>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-sm text-gray-600">
                  {product.all_ingredients.join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/product/beauty/scan")}
              className="scan-button"
            >
              Scan Another Product
            </button>
            <button 
              onClick={() => navigate("/product/beauty")}
              className="btn-secondary"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyProduct; 