import React from "react";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import { useApiData } from "../contexts/ApiContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, login } = useApiData();

  const features = [
    {
      icon: "🔍",
      title: "Instant Scanning",
      description: "Scan barcodes or take photos to get instant product information"
    },
    {
      icon: "📊",
      title: "Detailed Analysis",
      description: "Get comprehensive insights about ingredients, safety ratings, and health impacts"
    },
    {
      icon: "🛡️",
      title: "Safety First",
      description: "Make informed decisions with our safety assessment system"
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Simple and intuitive interface for everyone to use"
    }
  ];

  const categories = [
    {
      name: "Food Products",
      icon: "🥤",
      description: "Analyze nutritional content and ingredients",
      path: "/product/food",
      color: "from-green-400 to-green-600",
      bgGradient: "from-green-100 to-green-200",
      category: "food"
    },
    {
      name: "Beauty Products",
      icon: "🧴",
      description: "Check ingredient safety and ratings",
      path: "/product/beauty",
      color: "from-pink-400 to-pink-600",
      bgGradient: "from-pink-100 to-pink-200",
      category: "beauty"
    },
    {
      name: "Medicines",
      icon: "💊",
      description: "Get detailed medicine information and interactions",
      path: "/product/meds",
      color: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-100 to-blue-200",
      category: "meds"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        scanText="Start Scanning"
        scanLink={user ? "/product/food/scan" : "#"}
        searchText="Search for any product..."
        onScanClick={user ? undefined : login}
        requireAuth={!user}
      />

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Why Choose Really?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get accurate, reliable information about products you use daily. 
              Make better choices for your health and well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-effect p-8 rounded-2xl text-center slide-up hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4 hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Explore Our Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our three main categories to start your journey towards 
              informed consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="category-card card-shadow p-8 text-center cursor-pointer bounce-in group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.3}s` }}
                onClick={() => navigate(category.path)}
              >
                {/* Background gradient animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Floating particles */}
                <div className="floating-particle"></div>
                <div className="floating-particle"></div>
                <div className="floating-particle"></div>
                
                <div className="relative z-10">
                  <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                    <span 
                      className="animate-icon"
                      data-category={category.category}
                    >
                      {category.icon}
                    </span>
                    
                    {/* Category-specific glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {category.description}
                  </p>
                  <button className="btn-primary group-hover:scale-105 transition-transform duration-300">
                    Explore {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect p-12 rounded-3xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who are already making informed decisions 
              about their health and well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className={`scan-button relative ${!user ? 'cursor-pointer' : ''}`}
                onClick={user ? () => navigate("/product/food/scan") : login}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
                Start Scanning Now
                {!user && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Sign In
                  </div>
                )}
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate("/product/food")}
              >
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
