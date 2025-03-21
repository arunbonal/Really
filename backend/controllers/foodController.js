const axios = require("axios");
const foodProducts = require("../init/FoodData");

// home route
module.exports.home = async (req, res) => {
  res.json(foodProducts);
};

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

  res.json(productDetails);
};
