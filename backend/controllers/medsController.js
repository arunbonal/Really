const medicalDB = require("../init/Medical_DB");
const User = require("../models/user");

// home route
module.exports.home = async (req, res) => {
  console.log(medicalDB);
  res.json(medicalDB);
};

// search route for medicine products
module.exports.search = async (req, res) => {
  let medsName = req.params.medsName.toLowerCase();
  
  // Search for medicine in Medical_DB
  const medicine = medicalDB[medsName];
  
  if (!medicine) {
    return res.status(404).json({
      success: false,
      message: "Medicine not found in database",
    });
  }

  // Format response to match expected structure
  const productResponse = {
    product: {
      code: medsName,
      product_name: medicine.name,
      brands: medicine.brands?.join(", ") || "N/A",
      image_front_url: null,
      generic_name: medicine.purpose,
      nutriments: {},
      // Add medicine-specific fields
      ingredients: medicine.ingredients,
      sideEffects: medicine.sideEffects,
      warnings: medicine.warnings,
      interactions: medicine.interactions,
      age: medicine.age,
      pregnancy: medicine.pregnancy,
      diabetes: medicine.diabetes,
      trust: medicine.trust,
      alternatives: medicine.alternatives,
      brands_list: medicine.brands
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
          productName: medicine.name,
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

  res.json(productResponse);
};

// Helper function to calculate similarity score
const calculateSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

// Helper function to calculate edit distance (Levenshtein distance)
const getEditDistance = (str1, str2) => {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
};

// fuzzy search route for medicine products
module.exports.fuzzySearch = async (req, res) => {
  const { detectedText } = req.body;
  if (!detectedText) {
    return res.status(400).json({ error: "No text provided for search." });
  }

  const searchText = detectedText.toLowerCase().trim();
  const searchWords = searchText.split(/\s+/);
  
  // Create array of medicines from Medical_DB
  const medicines = Object.entries(medicalDB).map(([key, value]) => ({
    key,
    ...value
  }));

  let bestMatch = null;
  let bestScore = 0;
  const minSimilarity = 0.4; // Minimum similarity threshold

  // Search through all medicines
  for (const medicine of medicines) {
    let maxScore = 0;
    
    // Check medicine name
    const nameScore = calculateSimilarity(searchText, medicine.name.toLowerCase());
    maxScore = Math.max(maxScore, nameScore);
    
    // Check brands
    if (medicine.brands && Array.isArray(medicine.brands)) {
      for (const brand of medicine.brands) {
        const brandScore = calculateSimilarity(searchText, brand.toLowerCase());
        maxScore = Math.max(maxScore, brandScore);
      }
    }
    
    // Check alternatives
    if (medicine.alternatives && Array.isArray(medicine.alternatives)) {
      for (const alt of medicine.alternatives) {
        const altScore = calculateSimilarity(searchText, alt.toLowerCase());
        maxScore = Math.max(maxScore, altScore);
      }
    }
    
    // Check individual words from detected text
    for (const word of searchWords) {
      if (word.length >= 3) { // Only check words with 3+ characters
        // Check if word is contained in medicine name
        if (medicine.name.toLowerCase().includes(word)) {
          maxScore = Math.max(maxScore, 0.7); // High score for substring match
        }
        
        // Check if word is contained in brands
        if (medicine.brands && Array.isArray(medicine.brands)) {
          for (const brand of medicine.brands) {
            if (brand.toLowerCase().includes(word)) {
              maxScore = Math.max(maxScore, 0.6);
            }
          }
        }
        
        // Check alternatives
        if (medicine.alternatives && Array.isArray(medicine.alternatives)) {
          for (const alt of medicine.alternatives) {
            if (alt.toLowerCase().includes(word)) {
              maxScore = Math.max(maxScore, 0.5);
            }
          }
        }
      }
    }
    
    // Update best match if this score is better
    if (maxScore > bestScore && maxScore >= minSimilarity) {
      bestScore = maxScore;
      bestMatch = medicine;
    }
  }

  if (bestMatch) {
    // Track scan if user is authenticated
    if (req.isAuthenticated() && req.user) {
      try {
        // Check if this product was already scanned by this user
        const existingScan = req.user.scans.find(
          scan => scan.productId === bestMatch.key && scan.category === "meds"
        );

        if (!existingScan) {
          // Add new scan record
          req.user.scans.push({
            productId: bestMatch.key,
            productName: bestMatch.name,
            category: "meds",
            scanDate: new Date()
          });
          await req.user.save();
          console.log(`Tracked new medicine scan: ${bestMatch.name} for user ${req.user.username || req.user.email}`);
        } else {
          console.log(`Medicine ${bestMatch.name} already in scan history for user ${req.user.username || req.user.email}`);
        }
      } catch (error) {
        console.error("Error tracking medicine scan in fuzzy search:", error);
        // Don't fail the request if tracking fails
      }
    }

    return res.json({ 
      medicineName: bestMatch.key,
      displayName: bestMatch.name,
      confidence: Math.round(bestScore * 100),
      searchedText: detectedText
    });
  } else {
    return res.status(404).json({ 
      error: "No matching medicine found.",
      searchedText: detectedText,
      suggestion: "Try scanning a clearer image or check the medicine name spelling."
    });
  }
};