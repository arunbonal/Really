const axios = require("axios");
const User = require("../models/user");


// search route
module.exports.search = async (req, res) => {
  let barcodeNumber = req.params.barcodeNumber;
  
  console.log("=== FOOD SEARCH REQUEST ===");
  console.log("Barcode:", barcodeNumber);
  console.log("User authenticated:", req.isAuthenticated());
  console.log("User:", req.user ? req.user._id : "No user");
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("Cookies:", req.headers.cookie);
  
  const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcodeNumber}.json`;
  const response = await axios.get(apiUrl);
  const productDetails = response.data;

  console.log("Product found:", !!productDetails.product);

  if (!productDetails || !productDetails.product) {
    return res.status(404).json({
      success: false,
      message: "Product not found in Open Food Facts database",
    });
  }

  // Track scan if user is authenticated
  if (req.isAuthenticated() && req.user) {
    console.log("User authenticated, tracking scan for:", barcodeNumber);
    try {
      // Check if this product was already scanned by this user
      const existingScan = req.user.scans.find(
        scan => scan.productId === barcodeNumber && scan.category === "food"
      );

      if (!existingScan) {
        console.log("Adding new scan record for user:", req.user._id);
        // Add new scan record
        req.user.scans.push({
          productId: barcodeNumber,
          productName: productDetails.product?.product_name || "Unknown Food Product",
          category: "food",
          scanDate: new Date()
        });
        await req.user.save();
        console.log("Scan tracked successfully. Total scans:", req.user.scans.length);
      } else {
        console.log("Product already scanned by this user");
      }
    } catch (error) {
      console.error("Error tracking scan:", error);
      // Don't fail the request if tracking fails
    }
  } else {
    console.log("User not authenticated, skipping scan tracking");
  }

  res.json(productDetails);
};
