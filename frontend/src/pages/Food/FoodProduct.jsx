import React from "react";
import { useApiData } from "../../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

const FoodProduct = () => {
  const { apiData } = useApiData();
  const navigate = useNavigate();

  if (!apiData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">
            No Product Scanned
          </h2>
          <p className="text-gray-600 mb-8">
            Please scan a product barcode to view its information
          </p>
          <button 
            onClick={() => navigate("/product/food/scan")}
            className="scan-button"
          >
            Scan Product
          </button>
        </div>
      </div>
    );
  }

  const product = apiData.product;
  
  // Calculate nutrition score and get detailed analysis
  const getNutritionScore = () => {
    if (!product.nutriscore_grade) return "Unknown";
    return product.nutriscore_grade.toUpperCase();
  };

  const getNutritionColor = (score) => {
    const colors = {
      'A': 'rating-a',
      'B': 'rating-b', 
      'C': 'rating-c',
      'D': 'rating-d',
      'E': 'rating-e'
    };
    return colors[score] || 'rating-c';
  };

  const getGradeComment = (score) => {
    const comments = {
      'A': {
        title: "Excellent Choice! 🟢",
        description: "This product has excellent nutritional value with minimal processing and healthy ingredients.",
        details: "Low in unhealthy fats, sugars, and sodium. High in beneficial nutrients."
      },
      'B': {
        title: "Good Choice! 🟡",
        description: "This is a reasonably healthy product with moderate processing.",
        details: "Generally good nutritional profile with some room for improvement."
      },
      'C': {
        title: "Moderate Choice! 🟠",
        description: "This product has moderate nutritional value and may be moderately processed.",
        details: "Contains some beneficial nutrients but also some less healthy ingredients."
      },
      'D': {
        title: "Limited Choice! 🔴",
        description: "This product is highly processed and has limited nutritional value.",
        details: "High in unhealthy fats, sugars, or sodium. Consider alternatives."
      },
      'E': {
        title: "Poor Choice! ⚫",
        description: "This product is heavily processed with poor nutritional value.",
        details: "Very high in unhealthy ingredients. Strongly consider healthier alternatives."
      }
    };
    return comments[score] || {
      title: "Unknown Grade",
      description: "Nutritional information not available for this product.",
      details: "Consider checking the ingredients list for more information."
    };
  };

  const analyzeIngredients = () => {
    if (!product.ingredients_text) return null;
    
    const ingredients = product.ingredients_text.toLowerCase();
    const analysis = {
      highlyProcessed: false,
      artificialSweeteners: false,
      preservatives: false,
      artificialColors: false,
      transFats: false,
      highSugar: false,
      organic: false,
      natural: false,
      harmfulAdditives: false,
      msg: false,
      nitrates: false,
      phosphates: false,
      sulfites: false,
      carrageenan: false,
      bpa: false,
      gmos: false
    };

    // Comprehensive list of harmful food additives
    const harmfulAdditives = [
      // Artificial sweeteners
      'aspartame', 'sucralose', 'saccharin', 'acesulfame', 'neotame', 'advantame',
      
      // Artificial colors
      'red 40', 'red 3', 'yellow 5', 'yellow 6', 'blue 1', 'blue 2', 'green 3',
      'artificial color', 'artificial colour', 'fd&c', 'lake', 'tartrazine',
      
      // Preservatives
      'bha', 'bht', 'sodium benzoate', 'potassium sorbate', 'calcium propionate',
      'sodium nitrite', 'sodium nitrate', 'potassium nitrite', 'potassium nitrate',
      'sulfites', 'sulfur dioxide', 'sodium sulfite', 'potassium bisulfite',
      
      // MSG and flavor enhancers
      'monosodium glutamate', 'msg', 'glutamic acid', 'autolyzed yeast',
      'hydrolyzed protein', 'yeast extract', 'disodium inosinate', 'disodium guanylate',
      
      // Trans fats and hydrogenated oils
      'hydrogenated', 'partially hydrogenated', 'trans fat', 'trans-fat',
      
      // High fructose corn syrup and sweeteners
      'high fructose corn syrup', 'hfcs', 'corn syrup', 'fructose', 'glucose syrup',
      
      // Processed ingredients
      'modified corn starch', 'modified food starch', 'artificial flavor',
      'artificial flavour', 'natural flavor', 'natural flavour',
      
      // Emulsifiers and stabilizers
      'carrageenan', 'polysorbate 80', 'polysorbate 60', 'propylene glycol',
      'carboxymethyl cellulose', 'xanthan gum', 'guar gum', 'locust bean gum',
      
      // Phosphates
      'sodium phosphate', 'potassium phosphate', 'calcium phosphate',
      'phosphoric acid', 'trisodium phosphate',
      
      // Other harmful additives
      'potassium bromate', 'azodicarbonamide', 'butylated hydroxytoluene',
      'tert-butylhydroquinone', 'propyl gallate', 'ethoxyquin',
      
      // BPA and phthalates
      'bisphenol a', 'bpa', 'phthalates', 'dehp', 'dbp', 'bbp',
      
      // GMOs
      'genetically modified', 'gmo', 'genetically engineered',
      
      // Maltodextrin and other processed carbs
      'maltodextrin', 'dextrose', 'maltose', 'dextrin',
      
      // Processed oils
      'vegetable oil', 'canola oil', 'soybean oil', 'cottonseed oil',
      'palm oil', 'palm kernel oil'
    ];

    // Check for harmful additives
    const foundHarmfulAdditives = harmfulAdditives.filter(additive => 
      ingredients.includes(additive)
    );
    
    if (foundHarmfulAdditives.length > 0) {
      analysis.harmfulAdditives = true;
      analysis.foundAdditives = foundHarmfulAdditives;
    }

    // Check for highly processed indicators
    if (ingredients.includes('high fructose corn syrup') || 
        ingredients.includes('hydrogenated') ||
        ingredients.includes('partially hydrogenated') ||
        ingredients.includes('modified corn starch') ||
        ingredients.includes('artificial flavor') ||
        ingredients.includes('artificial color')) {
      analysis.highlyProcessed = true;
    }

    // Check for artificial sweeteners
    if (ingredients.includes('aspartame') || 
        ingredients.includes('sucralose') ||
        ingredients.includes('saccharin') ||
        ingredients.includes('acesulfame')) {
      analysis.artificialSweeteners = true;
    }

    // Check for preservatives
    if (ingredients.includes('bha') || 
        ingredients.includes('bht') ||
        ingredients.includes('sodium benzoate') ||
        ingredients.includes('potassium sorbate')) {
      analysis.preservatives = true;
    }

    // Check for artificial colors
    if (ingredients.includes('red 40') || 
        ingredients.includes('yellow 5') ||
        ingredients.includes('blue 1') ||
        ingredients.includes('artificial color')) {
      analysis.artificialColors = true;
    }

    // Check for trans fats
    if (ingredients.includes('hydrogenated') || 
        ingredients.includes('partially hydrogenated')) {
      analysis.transFats = true;
    }

    // Check for MSG
    if (ingredients.includes('monosodium glutamate') || 
        ingredients.includes('msg') ||
        ingredients.includes('glutamic acid')) {
      analysis.msg = true;
    }

    // Check for nitrates/nitrites
    if (ingredients.includes('sodium nitrite') || 
        ingredients.includes('sodium nitrate') ||
        ingredients.includes('potassium nitrite') ||
        ingredients.includes('potassium nitrate')) {
      analysis.nitrates = true;
    }

    // Check for phosphates
    if (ingredients.includes('sodium phosphate') || 
        ingredients.includes('phosphoric acid') ||
        ingredients.includes('trisodium phosphate')) {
      analysis.phosphates = true;
    }

    // Check for sulfites
    if (ingredients.includes('sulfites') || 
        ingredients.includes('sulfur dioxide') ||
        ingredients.includes('sodium sulfite')) {
      analysis.sulfites = true;
    }

    // Check for carrageenan
    if (ingredients.includes('carrageenan')) {
      analysis.carrageenan = true;
    }

    // Check for BPA
    if (ingredients.includes('bisphenol a') || 
        ingredients.includes('bpa')) {
      analysis.bpa = true;
    }

    // Check for GMOs
    if (ingredients.includes('genetically modified') || 
        ingredients.includes('gmo')) {
      analysis.gmos = true;
    }

    // Check for high sugar
    if (ingredients.includes('sugar') && 
        (ingredients.includes('high fructose') || 
         ingredients.includes('corn syrup'))) {
      analysis.highSugar = true;
    }

    // Check for organic/natural indicators
    if (ingredients.includes('organic') || 
        ingredients.includes('natural')) {
      analysis.natural = true;
    }

    return analysis;
  };

  const getProcessingLevel = (analysis) => {
    if (!analysis) return "Unknown";
    
    // Grade E products are always highly processed
    if (getNutritionScore() === 'E') {
      return "Highly Processed";
    }
    
    // Don't say "Minimally Processed" if grade is unknown
    if (getNutritionScore() === 'Unknown') {
      return "Unknown";
    }
    
    const indicators = [
      analysis.highlyProcessed,
      analysis.artificialSweeteners,
      analysis.preservatives,
      analysis.artificialColors,
      analysis.transFats,
      analysis.harmfulAdditives
    ].filter(Boolean).length;

    if (indicators >= 4) return "Highly Processed";
    if (indicators >= 2) return "Moderately Processed";
    if (indicators >= 1) return "Slightly Processed";
    return "Minimally Processed";
  };

  const getProcessingColor = (level) => {
    const colors = {
      "Highly Processed": "text-red-600",
      "Moderately Processed": "text-orange-600",
      "Slightly Processed": "text-yellow-600",
      "Minimally Processed": "text-green-600"
    };
    return colors[level] || "text-gray-600";
  };

  const nutritionScore = getNutritionScore();
  const gradeComment = getGradeComment(nutritionScore);
  const ingredientAnalysis = analyzeIngredients();
  const processingLevel = getProcessingLevel(ingredientAnalysis);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Scanner
        </button>

        {/* Product Header */}
        <div className="glass-effect p-8 rounded-3xl mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="text-center lg:text-left">
              {product.image_front_url ? (
                <img 
                  src={product.image_front_url} 
                  alt={product.product_name}
                  className="w-64 h-64 mx-auto lg:mx-0 object-contain rounded-2xl shadow-lg"
                />
              ) : (
                <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🍎</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  {product.brands} {product.product_name}
                </h1>
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.generic_name || "Product information from Open Food Facts"}
              </p>

              {/* Grade Highlight Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`rating-badge ${getNutritionColor(nutritionScore)} text-lg px-6 py-3`}>
                    Grade {nutritionScore}
                  </div>
                  <div className={`text-lg font-semibold ${getProcessingColor(processingLevel)}`}>
                    {processingLevel}
                  </div>
                </div>
                
                {/* Grade Comment */}
                <div className="bg-white/70 p-4 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg mb-2">{gradeComment.title}</h3>
                  <p className="text-gray-700 mb-2">{gradeComment.description}</p>
                  <p className="text-sm text-gray-600">{gradeComment.details}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mb-6">
                <div className="glass-effect p-4 rounded-xl text-center max-w-xs mx-auto">
                  <div className="text-2xl font-bold gradient-text">
                    {product.nutriments?.energy_100g ? `${Math.round(product.nutriments.energy_100g)}` : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">kcal/100g</div>
                </div>
              </div>

              {/* Barcode */}
              <div className="bg-white p-4 rounded-xl">
                <div className="text-sm text-gray-500 mb-1">Barcode</div>
                <div className="font-mono text-lg">{product.code}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Analysis */}
        {ingredientAnalysis && (
          <div className="glass-effect p-8 rounded-3xl mb-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              Processing Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Processing Level</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span className="font-semibold">Overall Level:</span>
                    <span className={`font-bold ${getProcessingColor(processingLevel)}`}>
                      {processingLevel}
                    </span>
                  </div>
                  
                  {ingredientAnalysis.highlyProcessed && (
                    <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-xl">
                      <span className="mr-2">⚠️</span>
                      <span>Contains highly processed ingredients</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.harmfulAdditives && (
                    <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-xl">
                      <span className="mr-2">🚨</span>
                      <span>Contains harmful food additives</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.artificialSweeteners && (
                    <div className="flex items-center p-3 bg-orange-50 text-orange-700 rounded-xl">
                      <span className="mr-2">🍯</span>
                      <span>Contains artificial sweeteners</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.msg && (
                    <div className="flex items-center p-3 bg-orange-50 text-orange-700 rounded-xl">
                      <span className="mr-2">🧂</span>
                      <span>Contains MSG/flavor enhancers</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.preservatives && (
                    <div className="flex items-center p-3 bg-yellow-50 text-yellow-700 rounded-xl">
                      <span className="mr-2">🧪</span>
                      <span>Contains preservatives</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.artificialColors && (
                    <div className="flex items-center p-3 bg-purple-50 text-purple-700 rounded-xl">
                      <span className="mr-2">🎨</span>
                      <span>Contains artificial colors</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.transFats && (
                    <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-xl">
                      <span className="mr-2">🚫</span>
                      <span>Contains trans fats</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.nitrates && (
                    <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-xl">
                      <span className="mr-2">🥓</span>
                      <span>Contains nitrates/nitrites</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.phosphates && (
                    <div className="flex items-center p-3 bg-yellow-50 text-yellow-700 rounded-xl">
                      <span className="mr-2">⚗️</span>
                      <span>Contains phosphates</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.sulfites && (
                    <div className="flex items-center p-3 bg-yellow-50 text-yellow-700 rounded-xl">
                      <span className="mr-2">🍷</span>
                      <span>Contains sulfites</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.carrageenan && (
                    <div className="flex items-center p-3 bg-yellow-50 text-yellow-700 rounded-xl">
                      <span className="mr-2">🌊</span>
                      <span>Contains carrageenan</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.bpa && (
                    <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-xl">
                      <span className="mr-2">🧬</span>
                      <span>Contains BPA</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.gmos && (
                    <div className="flex items-center p-3 bg-orange-50 text-orange-700 rounded-xl">
                      <span className="mr-2">🧬</span>
                      <span>Contains GMOs</span>
                    </div>
                  )}
                  
                  {ingredientAnalysis.natural && (
                    <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-xl">
                      <span className="mr-2">🌿</span>
                      <span>Contains natural/organic ingredients</span>
                    </div>
                  )}
                  
                  {/* Display Found Harmful Additives */}
                  {ingredientAnalysis.foundAdditives && ingredientAnalysis.foundAdditives.length > 0 && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl">
                      <h4 className="font-bold mb-2">🚨 Harmful Additives Found:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {ingredientAnalysis.foundAdditives.slice(0, 8).map((additive, index) => (
                          <div key={index} className="flex items-center">
                            <span className="mr-1">•</span>
                            <span className="capitalize">{additive}</span>
                          </div>
                        ))}
                        {ingredientAnalysis.foundAdditives.length > 8 && (
                          <div className="col-span-2 text-xs text-red-600">
                            +{ingredientAnalysis.foundAdditives.length - 8} more additives
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Recommendations</h3>
                <div className="space-y-3">
                  {nutritionScore === 'A' && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-xl">
                      <strong>✅ Great choice!</strong> This product is nutritionally sound and minimally processed.
                    </div>
                  )}
                  {nutritionScore === 'B' && (
                    <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                      <strong>👍 Good option!</strong> This product is reasonably healthy with moderate processing.
                    </div>
                  )}
                  {nutritionScore === 'C' && (
                    <div className="p-3 bg-yellow-50 text-yellow-700 rounded-xl">
                      <strong>⚠️ Moderate choice.</strong> Consider this as an occasional treat rather than a regular item.
                    </div>
                  )}
                  {nutritionScore === 'D' && (
                    <div className="p-3 bg-orange-50 text-orange-700 rounded-xl">
                      <strong>❌ Limited choice.</strong> This product is highly processed. Consider healthier alternatives.
                    </div>
                  )}
                  {nutritionScore === 'E' && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl">
                      <strong>🚫 Poor choice.</strong> This product is heavily processed with poor nutritional value.
                    </div>
                  )}
                  
                  {processingLevel === "Highly Processed" && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl">
                      <strong>💡 Tip:</strong> Look for products with fewer ingredients and avoid those with artificial additives.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Nutrition Information */}
          <div className="glass-effect p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              Nutrition Information
            </h2>
            
            {product.nutriments ? (
              <div className="space-y-4">
                {Object.entries(product.nutriments)
                  .filter(([key, value]) => 
                    typeof value === 'number' && 
                    ['energy_100g', 'proteins_100g', 'carbohydrates_100g', 'fat_100g', 'fiber_100g', 'salt_100g', 'sugars_100g'].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                      <span className="font-semibold capitalize">
                        {key.replace('_100g', '').replace('_', ' ')}
                      </span>
                      <span className="font-mono">
                        {key.includes('energy') ? `${Math.round(value)} kcal` : `${value}g`}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600">Nutrition information not available</p>
            )}
          </div>

          {/* Ingredients */}
          <div className="glass-effect p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              Ingredients
            </h2>
            
            {product.ingredients_text ? (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.ingredients_text}
                </p>
                
                {product.ingredients_analysis_tags && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Analysis:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients_analysis_tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag.replace('en:', '').replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">Ingredients information not available</p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {(product.allergens_tags || product.traces_tags || product.additives_tags) && (
          <div className="glass-effect p-8 rounded-3xl mt-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              Allergens & Additives
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {product.allergens_tags && (
                <div>
                  <h3 className="font-semibold text-red-600 mb-3">⚠️ Allergens</h3>
                  <div className="space-y-2">
                    {product.allergens_tags.map((allergen, index) => (
                      <div key={index} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm">
                        {allergen.replace('en:', '').replace('-', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {product.traces_tags && (
                <div>
                  <h3 className="font-semibold text-orange-600 mb-3">🔍 May Contain</h3>
                  <div className="space-y-2">
                    {product.traces_tags.map((trace, index) => (
                      <div key={index} className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm">
                        {trace.replace('en:', '').replace('-', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {product.additives_tags && (
                <div>
                  <h3 className="font-semibold text-purple-600 mb-3">🧪 Additives</h3>
                  <div className="space-y-2">
                    {product.additives_tags.map((additive, index) => (
                      <div key={index} className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm">
                        {additive.replace('en:', '').replace('-', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/product/food/scan")}
              className="scan-button"
            >
              Scan Another Product
            </button>
            <button 
              onClick={() => navigate("/product/food")}
              className="btn-secondary"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodProduct;
