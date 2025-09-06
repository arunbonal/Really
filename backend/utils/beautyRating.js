const TOXICITY_DB = {
  // 🌿 SAFE INGREDIENTS (Rating: 1-2)
  "Hyaluronic Acid": 1,
  "Vitamin C": 1,
  "Aloe Vera": 1,
  Niacinamide: 2,
  "Panthenol (Vitamin B5)": 1,
  "Centella Asiatica": 1,
  Squalane: 1,
  "Green Tea Extract": 1,
  Ceramides: 1,
  "Argan Oil": 1,
  "Rosehip Oil": 1,
  "Shea Butter": 1,
  Glycerin: 1,
  "Jojoba Oil": 1,
  "Coconut Oil": 2,
  "Chamomile Extract": 1,
  "Licorice Root Extract": 1,
  Caffeine: 2,

  // ⚖️ MODERATE INGREDIENTS (Rating: 3-5)
  "Lactic Acid (AHA)": 3,
  "Glycolic Acid (AHA)": 3,
  "Salicylic Acid (BHA)": 4,
  "Retinol (Vitamin A1)": 5,
  "Kojic Acid": 4,
  "Alpha Arbutin": 3,
  Hydroquinone: 5,
  "Synthetic Fragrance": 5,
  "Alcohol (Denatured)": 4,
  "Propylene Glycol": 3,
  Phenoxyethanol: 4,
  "BHT (Butylated Hydroxytoluene)": 5,
  "BHA (Butylated Hydroxyanisole)": 5,
  "PEG (Polyethylene Glycol)": 5,

  // 🚨 HIGH-RISK INGREDIENTS (Rating: 6-8)
  Paraben: 7,
  "Sodium Lauryl Sulfate (SLS)": 8,
  "Sodium Laureth Sulfate (SLES)": 7,
  "Talc (With Asbestos Risk)": 8,
  "Coal Tar": 8,
  Toluene: 7,
  "Silicones (Dimethicone, Cyclopentasiloxane)": 6,
  Triclosan: 7,
  Triclocarban: 7,
  "DEA (Diethanolamine)": 7,
  "MEA (Monoethanolamine)": 6,
  "TEA (Triethanolamine)": 6,

  // ☠️ EXTREMELY HARMFUL INGREDIENTS (Rating: 9-10)
  "Phthalates (DBP, DEP, BBP)": 9,
  Formaldehyde: 10,
  Benzene: 10,
  Asbestos: 10,
  "Lead Acetate": 10,
  "Mercury Compounds": 10,
  "PFAS (Per- and Polyfluoroalkyl Substances)": 10,
  "Dioxane (1,4-Dioxane)": 10,
};

function getToxicityScore(ingredient) {
  return TOXICITY_DB[ingredient] || 3; // Default to 3 if not found
}

function getWeight(score) {
  if (score <= 2) return 1; // Safe
  if (score <= 5) return 2; // Moderate Risk
  if (score <= 8) return 3; // High Risk
  return 4; // Very High Risk
}

function gradeBeautyProduct(ingredients) {
  if (!ingredients || ingredients.length === 0) {
    return "Unknown (No Ingredients Provided)";
  }

  let totalScore = 0;
  let totalWeight = 0;

  ingredients.forEach((ing) => {
    const score = getToxicityScore(ing);
    const weight = getWeight(score);
    totalScore += score * weight;
    totalWeight += weight;
  });

  const safetyScore = totalWeight > 0 ? totalScore / totalWeight : 0;

  if (safetyScore <= 2.0) return "A";
  if (safetyScore <= 3.5) return "B";
  if (safetyScore <= 5.0) return "C";
  if (safetyScore <= 7.0) return "D";
  return "E";
}

// Example Usage
const ingredientsList = [
  "Aloe Vera Extract",
  "Glycolic Acid",
  "Benzyl Alcohol",
  "Citrus Extract",
  "Glycerin",
  "Vitamin E",
];

const grade = gradeBeautyProduct(ingredientsList);
