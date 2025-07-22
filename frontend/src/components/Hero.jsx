import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { useApiData } from "../contexts/ApiContext";
import assets from "../assets/assets";

const Hero = ({ scanText, scanLink, searchText, onScanClick, requireAuth }) => {
  const navigate = useNavigate();
  const { currentMenu, setCurrentMenu } = useApiData();
  const [icon, setIcon] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (currentMenu === "food") {
      setIcon("🥤");
      setCategory("food");
    } else if (currentMenu === "beauty") {
      setIcon("🧴");
      setCategory("beauty");
    } else if (currentMenu === "meds") {
      setIcon("💊");
      setCategory("meds");
    } else {
      setIcon(null);
      setCategory("");
    }
  }, [currentMenu]);

  const handleLogoClick = () => {
    setCurrentMenu(""); // Reset the current menu
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Section - Scan Button */}
          <div className="lg:col-span-1">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                Scan & Discover
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get instant insights about what you're consuming
              </p>
            </div>
            
            <div 
              className={`scan-button w-full lg:w-auto inline-block text-center cursor-pointer group ${
                requireAuth ? 'relative' : ''
              }`}
              onClick={onScanClick || (() => navigate(scanLink))}
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
                <span>{scanText}</span>
              </div>
              
              {/* Auth Required Badge */}
              {requireAuth && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Sign In
                </div>
              )}
            </div>
          </div>

          {/* Center Section - QR Code */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="glass-effect p-8 rounded-3xl text-center max-w-sm">
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-2xl p-4 shadow-lg">
                <img 
                  src={assets.qrcode} 
                  alt="QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Download Our App
              </h3>
              <p className="text-sm text-gray-600">
                Scan this QR code to get the Really mobile app
              </p>
            </div>
          </div>

          {/* Right Section - Product Animation & Search */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Enhanced Product Animation */}
            <div className="glass-effect p-6 rounded-2xl category-icon-container relative overflow-hidden">
              {/* Floating Particles */}
              <div className="floating-particle"></div>
              <div className="floating-particle"></div>
              <div className="floating-particle"></div>
              
              <div className="text-center mb-4 relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Selected Category
                </h3>
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg animated-gradient relative overflow-hidden">
                  {icon && (
                    <span 
                      className="text-5xl animate-icon relative z-10"
                      data-category={category}
                    >
                      {icon}
                    </span>
                  )}
                  
                  {/* Category-specific background effects */}
                  {category === "food" && (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-green-400/30 rounded-2xl"></div>
                  )}
                  {category === "beauty" && (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-pink-400/30 rounded-2xl"></div>
                  )}
                  {category === "meds" && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-400/30 rounded-2xl"></div>
                  )}
                </div>
              </div>
              
              <div className="text-center relative z-10">
                <p className="text-sm text-gray-600 mb-2">
                  {currentMenu ? `Ready to scan ${currentMenu} products` : 'Choose a category to start'}
                </p>
                
                {/* Category-specific status indicators */}
                {category === "food" && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Food Scanner Active</span>
                  </div>
                )}
                {category === "beauty" && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-pink-600 font-medium">Beauty Scanner Active</span>
                  </div>
                )}
                {category === "meds" && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-600 font-medium">Medicine Scanner Active</span>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Search Products
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="search-input flex-1"
                  placeholder={searchText}
                />
                <button className="btn-primary px-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-gray-600">Products Analyzed</div>
          </div>
          <div className="glass-effect p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div className="glass-effect p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
