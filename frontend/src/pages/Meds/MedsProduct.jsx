import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MedsProduct = () => {
  const { medsName } = useParams();
  const navigate = useNavigate();
  const [medicineData, setMedicineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicineData = async () => {
      if (!medsName) {
        setError("No medicine name provided");
        setLoading(false);
        return;
      }

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
        const apiUrl = `${backendUrl}/product/meds/${encodeURIComponent(medsName)}`;
        
        const response = await fetch(apiUrl, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Medicine not found: ${response.status}`);
        }

        const data = await response.json();
        setMedicineData(data);
      } catch (err) {
        console.error("Error fetching medicine data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineData();
  }, [medsName]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleScanAgain = () => {
    navigate('/product/meds/scan');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading medicine information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-effect p-8 rounded-3xl text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Medicine Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScanAgain}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Scan Again
              </button>
              <button
                onClick={handleGoBack}
                className="bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!medicineData || !medicineData.product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-effect p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
            <button
              onClick={handleGoBack}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { product } = medicineData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Medicine Information
          </h1>
          <p className="text-lg text-gray-600">
            Detailed safety and usage information for your scanned medicine
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Basic Information Card */}
          <div className="glass-effect p-8 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.product_name}</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-semibold w-20">Purpose:</span>
                    <span className="text-gray-700">{product.generic_name}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-semibold w-20">Brands:</span>
                    <span className="text-gray-700">{product.brands}</span>
                  </div>
                  {product.ingredients && (
                    <div className="flex items-start">
                      <span className="text-blue-600 font-semibold w-20">Ingredients:</span>
                      <span className="text-gray-700">{product.ingredients}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🛡️ Safety Overview</h3>
                {product.trust && product.trust.length > 0 && (
                  <div className="mb-3">
                    <span className="text-green-600 font-semibold">Trust Indicators:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.trust.map((indicator, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Information Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Side Effects */}
            {product.sideEffects && (
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Side Effects</h3>
                <p className="text-gray-700">{product.sideEffects}</p>
              </div>
            )}

            {/* Warnings */}
            {product.warnings && (
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-orange-600 mb-4">🚨 Warnings</h3>
                <p className="text-gray-700">{product.warnings}</p>
              </div>
            )}

            {/* Drug Interactions */}
            {product.interactions && (
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-purple-600 mb-4">🔄 Drug Interactions</h3>
                <p className="text-gray-700">{product.interactions}</p>
              </div>
            )}

            {/* Age & Special Conditions */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-600 mb-4">👥 Usage Guidelines</h3>
              <div className="space-y-3">
                {product.age && (
                  <div>
                    <span className="font-semibold text-gray-800">Age:</span>
                    <span className="text-gray-700 ml-2">{product.age}</span>
                  </div>
                )}
                {product.pregnancy && (
                  <div>
                    <span className="font-semibold text-gray-800">Pregnancy:</span>
                    <span className="text-gray-700 ml-2">{product.pregnancy}</span>
                  </div>
                )}
                {product.diabetes && (
                  <div>
                    <span className="font-semibold text-gray-800">Diabetes:</span>
                    <span className="text-gray-700 ml-2">{product.diabetes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alternatives */}
          {product.alternatives && product.alternatives.length > 0 && (
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-600 mb-4">🔄 Alternative Medicines</h3>
              <div className="flex flex-wrap gap-2">
                {product.alternatives.map((alt, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScanAgain}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                Scan Another Medicine
              </button>
              <button
                onClick={handleGoBack}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
              >
                Go Back
              </button>
            </div>
            
            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mt-6">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Disclaimer:</strong> This information is for educational purposes only. 
                Always consult with a healthcare professional or pharmacist before taking any medication. 
                Do not use this as a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MedsProduct;
