import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { useApiData } from "../contexts/ApiContext";
import assets from "../assets/assets";

const Hero = ({ scanText, scanLink, searchText }) => {
  const navigate = useNavigate();
  const { currentMenu } = useApiData();
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (currentMenu === "food") {
      setIcon("🍎"); // Food basket
    } else if (currentMenu === "beauty") {
      setIcon("🧴"); // Shampoo
    } else if (currentMenu === "meds") {
      setIcon("💊"); // Medicine
    } else {
      setIcon(null);
    }
  }, [currentMenu]);

  return (
    <div className="flex justify-between items-start px-10 mt-5">
      {/* Scan Button (Big Box on the Left) */}
      <div
        className="w-1/2 h-40 bg-gray-300 flex items-center justify-center text-lg font-semibold cursor-pointer"
        onClick={() => navigate(scanLink)}
      >
        {scanText}
      </div>

      {/* Mid Section (QR to download app) */}

      {/* Right Section (Animation + Search) */}
      <div className="w-1/3 space-y-7 relative">
        {/* Animation of Product Selected */}
        <div className="h-22 bg-gray-300 flex items-center justify-around  px-4 relative overflow-hidden">
          <span className="animate-icon">{icon}</span>
        </div>

        {/* Search Bar */}
        <div className="flex">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-400"
            placeholder={searchText}
          />
          <button className="px-4 py-2 bg-gray-400 text-white border border-gray-400 cursor-pointer">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
