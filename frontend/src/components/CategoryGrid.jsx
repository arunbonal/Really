import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    <Link to={link} className="block border">
      <div className="bg-gray-100 rounded-md overflow-hidden transition-transform hover:scale-105 w-40">
        <div className="relative aspect-square">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-gray-800 text-sm font-medium">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function CategoryGrid({ categories }) {
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            link={category.link}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
