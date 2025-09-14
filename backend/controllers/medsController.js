const meds = require("../init/medsData");
const User = require("../models/user");

// home route
module.exports.home = async (req, res) => {
  console.log(meds);
  res.json(meds);
};

// search route for medicine products
module.exports.search = async (req, res) => {
  let medsName = req.params.medsName;
  
  // For now, return a mock response since medicine products don't have a public API like food
  const mockProduct = {
    product: {
      code: medsName,
      product_name: "Medicine Product",
      brands: "Sample Brand",
      image_front_url: null,
      generic_name: "Medicine product information",
      nutriments: {}
    }
  };

  // Track scan if user is authenticated
  if (req.isAuthenticated() && req.user) {
    try {
      // Check if this product was already scanned by this user
      const existingScan = req.user.scans.find(
        scan => scan.productId === medsName && scan.category === "meds"
      );

      if (!existingScan) {
        // Add new scan record
        req.user.scans.push({
          productId: medsName,
          productName: medsName.charAt(0).toUpperCase() + medsName.slice(1), // Capitalize first letter
          category: "meds",
          scanDate: new Date()
        });
        await req.user.save();
      }
    } catch (error) {
      console.error("Error tracking meds scan:", error);
      // Don't fail the request if tracking fails
    }
  }

  res.json(medsName);
};

// fuzzy search route for medicine products
module.exports.fuzzySearch = async (req, res) => {
  const { detectedText } = req.body;
  if (!detectedText) {
    return res.status(400).json({ error: "No text provided for search." });
  }

  const searchWords = detectedText.toLowerCase().split(" ");

  // Simple fuzzy matching: check if any word from detected text is included in medicine name
  const foundMedicine = meds.find(medicine => {
    const medicineNameLower = medicine.name.toLowerCase();
    return searchWords.some(word => medicineNameLower.includes(word));
  });

  if (foundMedicine) {
    return res.json({ medicineName: foundMedicine.name });
  } else {
    return res.status(404).json({ error: "No matching medicine found." });
  }
};