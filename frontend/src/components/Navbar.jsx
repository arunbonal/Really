import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { useApiData } from "../contexts/ApiContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setCurrentMenu, user, login } = useApiData();

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    }
  };

  const handleLogoClick = () => {
    setCurrentMenu(""); // Reset the current menu
    navigate("/");
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Really</h1>
              <p className="text-xs text-gray-500 -mt-1">Know What You Consume</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Food", path: "/product/food", icon: "🥤", key: "food" },
              { name: "Beauty", path: "/product/beauty", icon: "🧴", key: "beauty" },
              { name: "Medicine", path: "/product/meds", icon: "💊", key: "meds" }
            ].map((category) => (
              <NavLink
                key={category.name}
                to={category.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`
                }
                onClick={() => setCurrentMenu(category.key)}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
              </NavLink>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div 
                  className="cursor-pointer group"
                  onClick={handleProfileClick}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-semibold text-sm">
                        {user.displayName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={login}
                className="btn-primary flex items-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-4">
          <div className="flex justify-center space-x-4">
            {[
              { name: "Food", path: "/product/food", icon: "🥤", key: "food" },
              { name: "Beauty", path: "/product/beauty", icon: "🧴", key: "beauty" },
              { name: "Medicine", path: "/product/meds", icon: "💊", key: "meds" }
            ].map((category) => (
              <NavLink
                key={category.name}
                to={category.path}
                className={({ isActive }) =>
                  `flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`
                }
                onClick={() => setCurrentMenu(category.key)}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-xs font-semibold">{category.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
