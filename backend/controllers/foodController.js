const axios = require("axios");
const User = require("../models/user");


// search route
module.exports.search = async (req, res) => {
  let barcodeNumber = req.params.barcodeNumber;
  
  
  const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcodeNumber}.json`;
  const response = await axios.get(apiUrl);
  const productDetails = response.data;

  if (!productDetails || !productDetails.product) {
    return res.status(404).json({
      success: false,
      message: "Product not found in Open Food Facts database",
    });
  }

  // Track scan if user is authenticated
  if (req.isAuthenticated() && req.user) {
    try {
      // Check if this product was already scanned by this user
      const existingScan = req.user.scans.find(
        scan => scan.productId === barcodeNumber && scan.category === "food"
      );

      if (!existingScan) {
        // Add new scan record
        req.user.scans.push({
          productId: barcodeNumber,
          productName: productDetails.product?.product_name || "Unknown Food Product",
          category: "food",
          scanDate: new Date()
        });
        await req.user.save();
      }
    } catch (error) {
      console.error("Error tracking scan:", error);
      // Don't fail the request if tracking fails
    }
  }

  res.json(productDetails);
};
