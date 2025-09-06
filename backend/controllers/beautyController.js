const beautyProducts = require("../init/beautyData");
const User = require("../models/user");

// home route
module.exports.home = async (req, res) => {
  res.json(beautyProducts);
};

// search route for beauty products
module.exports.search = async (req, res) => {
  let barcodeNumber = req.params.barcodeNumber;
  
  
  // Search for product in beauty database
  const product = beautyProducts.find(p => p.barcode_number === barcodeNumber);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found in beauty database",
    });
  }

  // Format response to match expected structure
  const productResponse = {
    product: {
      code: product.barcode_number,
      product_name: product.product_name,
      brands: product.product_name.split(' ')[0], // Use first word as brand
      image_front_url: product.product_image_url,
      generic_name: `${product.category} - ${product.subCategory}`,
      nutriments: {},
      // Add beauty-specific fields
      beauty_rating: product.rating,
      concerning_ingredients: product.concerning_ingredients,
      good_ingredients: product.good_ingredients,
      all_ingredients: product.all_ingredients
    }
  };

  // Track scan if user is authenticated
  if (req.isAuthenticated() && req.user) {
    try {
      // Check if this product was already scanned by this user
      const existingScan = req.user.scans.find(
        scan => scan.productId === barcodeNumber && scan.category === "beauty"
      );

      if (!existingScan) {
        // Add new scan record
        req.user.scans.push({
          productId: barcodeNumber,
          productName: product.product_name,
          category: "beauty",
          scanDate: new Date()
        });
        await req.user.save();
      }
    } catch (error) {
      console.error("Error tracking beauty scan:", error);
      // Don't fail the request if tracking fails
    }
  }

  res.json(productResponse);
};
