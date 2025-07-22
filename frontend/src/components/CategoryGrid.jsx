import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    <Link to={link} className="block">
      <div className="category-card card-shadow group">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
            {title}
          </h3>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>Explore products</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CategoryGrid({ categories }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          Explore Categories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover detailed information about food products, beauty items, and medicines. 
          Make informed decisions about what you consume.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div 
            key={category.id} 
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CategoryCard
              title={category.title}
              image={category.image}
              link={category.link}
            />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <div className="glass-effect p-8 rounded-3xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 gradient-text">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Use our barcode scanner to get instant information about any product
          </p>
          <button className="scan-button">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
            </svg>
            Scan Barcode
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryGrid;
