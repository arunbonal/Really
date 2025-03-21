let beautyProducts = [
  {
    barcode_number: "8901234567890",
    product_name: "Biotique Bio Aloe Vera",
    product_image_url: "https://example.com/biotique-aloe-vera.jpg",
    category: "Skincare",
    subCategory: "Moisturizer",
    all_ingredients: [
      "Aloe Vera Extract",
      "Glycolic Acid",
      "Benzyl Alcohol",
      "Citrus Extract",
      "Glycerin",
      "Vitamin E",
    ],
    rating: 3,
    concerning_ingredients: ["Benzyl Alcohol"],
    good_ingredients: ["Aloe Vera Extract", "Vitamin E", "Glycerin"],
  },
  {
    barcode_number: "8901122334455",
    product_name: "Dove Intense Repair Shampoo",
    product_image_url: "https://example.com/dove-shampoo.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Aqua",
      "Sodium Lauryl Sulfate",
      "Cocamidopropyl Betaine",
      "Fragrance",
      "Silicone",
      "Citric Acid",
    ],
    rating: 2,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Silicone"],
    good_ingredients: ["Cocamidopropyl Betaine", "Citric Acid"],
  },
  {
    barcode_number: "8901496784352",
    product_name: "Mamaearth Vitamin C Face Wash",
    product_image_url: "https://example.com/mamaearth-vitamin-c.jpg",
    category: "Skincare",
    subCategory: "Face Wash",
    all_ingredients: [
      "Vitamin C",
      "Aloe Vera",
      "Citrus Extract",
      "Glycerin",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: [],
    good_ingredients: ["Vitamin C", "Aloe Vera", "Citrus Extract"],
  },
  {
    barcode_number: "8901234569876",
    product_name: "Patanjali Kesh Kanti Hair Cleanser",
    product_image_url: "https://example.com/patanjali-kesh-kanti.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Aloe Vera",
      "Shikakai",
      "Reetha",
      "Brahmi",
      "Ginger Extract",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Aloe Vera", "Shikakai", "Brahmi", "Ginger Extract"],
  },
  {
    barcode_number: "8901111112222",
    product_name: "Olay Total Effects Day Cream",
    product_image_url: "https://example.com/olay-day-cream.jpg",
    category: "Skincare",
    subCategory: "Day Cream",
    all_ingredients: [
      "Water",
      "Dimethicone",
      "Niacinamide",
      "Phenoxyethanol",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Dimethicone", "Phenoxyethanol"],
    good_ingredients: ["Niacinamide"],
  },
  {
    barcode_number: "8901122334567",
    product_name: "Kama Ayurveda Rose Water",
    product_image_url: "https://example.com/kama-rose-water.jpg",
    category: "Skincare",
    subCategory: "Toner",
    all_ingredients: ["Rosa Damascena Flower Extract", "Water", "Glycerin"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Rosa Damascena Flower Extract", "Glycerin"],
  },
  {
    barcode_number: "8901234578901",
    product_name: "L'Oreal Paris Extraordinary Oil Shampoo",
    product_image_url: "https://example.com/loreal-oil-shampoo.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Aqua",
      "Dimethicone",
      "Cyclopentasiloxane",
      "Paraffinum Liquidum",
      "Fragrance",
    ],
    rating: 2,
    concerning_ingredients: [
      "Dimethicone",
      "Cyclopentasiloxane",
      "Paraffinum Liquidum",
    ],
    good_ingredients: [],
  },
  {
    barcode_number: "8901234580123",
    product_name: "Forest Essentials Kashmiri Saffron & Neem Face Wash",
    product_image_url: "https://example.com/forest-essentials-saffron-neem.jpg",
    category: "Skincare",
    subCategory: "Face Wash",
    all_ingredients: [
      "Saffron",
      "Neem Extract",
      "Aloe Vera",
      "Honey",
      "Rose Water",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Saffron", "Neem Extract", "Aloe Vera", "Honey"],
  },
  {
    barcode_number: "8901234591234",
    product_name: "Himalaya Herbals Anti-Hair Fall Shampoo",
    product_image_url: "https://example.com/himalaya-anti-hair-fall.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Bhringraj Extract",
      "Amla Extract",
      "Shikakai Extract",
      "Water",
      "Fragrance",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Bhringraj Extract", "Amla Extract", "Shikakai Extract"],
  },
  {
    barcode_number: "8901100078902",
    product_name: "Olay Regenerist Advanced Anti-Aging Night Cream",
    product_image_url: "https://example.com/olay-night-cream.jpg",
    category: "Skincare",
    subCategory: "Night Cream",
    all_ingredients: [
      "Water",
      "Dimethicone",
      "Niacinamide",
      "Citric Acid",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Dimethicone", "Fragrance"],
    good_ingredients: ["Niacinamide", "Citric Acid"],
  },
  {
    barcode_number: "8901145678901",
    product_name: "Morpheme Remedies Amla Hair Oil",
    product_image_url: "https://example.com/morpheme-amla-oil.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: ["Amla Extract", "Coconut Oil", "Almond Oil", "Olive Oil"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Amla Extract",
      "Coconut Oil",
      "Almond Oil",
      "Olive Oil",
    ],
  },
  {
    barcode_number: "8901122334569",
    product_name:
      "Lotus Herbals Whiteglow Skin Whitening & Brightening Gel Creme",
    product_image_url: "https://example.com/lotus-whiteglow.jpg",
    category: "Skincare",
    subCategory: "Moisturizer",
    all_ingredients: [
      "Vitamin C",
      "Mulberry Extract",
      "Glycolic Acid",
      "Sodium Hydroxide",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Glycolic Acid", "Sodium Hydroxide"],
    good_ingredients: ["Vitamin C", "Mulberry Extract"],
  },
  {
    barcode_number: "8901234565550",
    product_name: "Biotique Bio Bhringraj Therapeutic Hair Oil",
    product_image_url: "https://example.com/biotique-bhringraj.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: ["Bhringraj", "Amla", "Neem", "Coconut Oil", "Saffron"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Bhringraj", "Amla", "Neem", "Coconut Oil", "Saffron"],
  },
  {
    barcode_number: "8901134567890",
    product_name: "Patanjali Aloe Vera Gel",
    product_image_url: "https://example.com/patanjali-aloe-vera-gel.jpg",
    category: "Skincare",
    subCategory: "Gel",
    all_ingredients: ["Aloe Vera", "Water", "Glycerin", "Vitamin E"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Aloe Vera", "Vitamin E", "Glycerin"],
  },
  {
    barcode_number: "8901102112345",
    product_name: "Kiehl's Ultra Facial Cleanser",
    product_image_url: "https://example.com/kiehls-ultra-facial.jpg",
    category: "Skincare",
    subCategory: "Cleanser",
    all_ingredients: [
      "Water",
      "Glycerin",
      "Polysorbate 20",
      "Sodium Chloride",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Polysorbate 20", "Fragrance"],
    good_ingredients: ["Glycerin"],
  },
  {
    barcode_number: "8901156789012",
    product_name: "Mamaearth Onion Hair Oil",
    product_image_url: "https://example.com/mamaearth-onion-oil.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: [
      "Onion Extract",
      "Amla Extract",
      "Coconut Oil",
      "Almond Oil",
      "Sunflower Seed Oil",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Onion Extract",
      "Amla Extract",
      "Coconut Oil",
      "Almond Oil",
    ],
  },
  {
    barcode_number: "8901234512346",
    product_name: "Nivea Soft Light Moisturizer",
    product_image_url: "https://example.com/nivea-soft-moisturizer.jpg",
    category: "Skincare",
    subCategory: "Moisturizer",
    all_ingredients: [
      "Water",
      "Glyceryl Stearate",
      "Citric Acid",
      "Fragrance",
      "Jojoba Oil",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Jojoba Oil"],
  },
  {
    barcode_number: "8901234590123",
    product_name: "Revlon Professional Nutri Color Cream",
    product_image_url: "https://example.com/revlon-nutri-color.jpg",
    category: "Haircare",
    subCategory: "Hair Color",
    all_ingredients: [
      "Water",
      "Ammonium Hydroxide",
      "Hydrogen Peroxide",
      "Fragrance",
      "Paraffinum Liquidum",
    ],
    rating: 2,
    concerning_ingredients: [
      "Ammonium Hydroxide",
      "Hydrogen Peroxide",
      "Paraffinum Liquidum",
    ],
    good_ingredients: [],
  },
  {
    barcode_number: "8901167890123",
    product_name: "L'Oreal Paris Revitalift Anti-Aging Night Cream",
    product_image_url: "https://example.com/loreal-revitalift.jpg",
    category: "Skincare",
    subCategory: "Night Cream",
    all_ingredients: [
      "Water",
      "Dimethicone",
      "Retinol",
      "Vitamin C",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Dimethicone", "Fragrance"],
    good_ingredients: ["Retinol", "Vitamin C"],
  },
  {
    barcode_number: "8901188765432",
    product_name: "Khadi Natural Herbal Hair Oil",
    product_image_url: "https://example.com/khadi-herbal-hair-oil.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: [
      "Bhringraj Extract",
      "Amla Extract",
      "Neem Oil",
      "Coconut Oil",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Bhringraj Extract",
      "Amla Extract",
      "Neem Oil",
      "Coconut Oil",
    ],
  },
  {
    barcode_number: "8901198765432",
    product_name: "Pond's White Beauty Cream",
    product_image_url: "https://example.com/ponds-white-beauty.jpg",
    category: "Skincare",
    subCategory: "Cream",
    all_ingredients: [
      "Water",
      "Glycerin",
      "Niacinamide",
      "Fragrance",
      "Titanium Dioxide",
    ],
    rating: 3,
    concerning_ingredients: ["Fragrance", "Titanium Dioxide"],
    good_ingredients: ["Niacinamide"],
  },
  {
    barcode_number: "8901201234567",
    product_name: "WOW Skin Science Aloe Vera Gel",
    product_image_url: "https://example.com/wow-aloe-vera-gel.jpg",
    category: "Skincare",
    subCategory: "Gel",
    all_ingredients: [
      "Aloe Vera",
      "Glycerin",
      "Sodium Benzoate",
      "Citric Acid",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Aloe Vera", "Glycerin"],
  },
  {
    barcode_number: "8901234523456",
    product_name: "Biotique Bio Almond Oil",
    product_image_url: "https://example.com/biotique-bio-almond-oil.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: ["Almond Oil", "Bhringraj", "Amla", "Hibiscus Extract"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Almond Oil", "Bhringraj", "Amla", "Hibiscus Extract"],
  },
  {
    barcode_number: "8901234534567",
    product_name: "The Body Shop Tea Tree Oil",
    product_image_url: "https://example.com/the-body-shop-tea-tree-oil.jpg",
    category: "Skincare",
    subCategory: "Oil",
    all_ingredients: [
      "Melaleuca Alternifolia (Tea Tree) Leaf Oil",
      "Linalool",
      "Citronellol",
      "Terpinen-4-ol",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Melaleuca Alternifolia (Tea Tree) Leaf Oil",
      "Terpinen-4-ol",
    ],
  },
  {
    barcode_number: "8901234545678",
    product_name: "Lotus Herbals Safe Sun Sunscreen SPF 50",
    product_image_url: "https://example.com/lotus-sunscreen.jpg",
    category: "Skincare",
    subCategory: "Sunscreen",
    all_ingredients: [
      "Octinoxate",
      "Titanium Dioxide",
      "Zinc Oxide",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Octinoxate", "Fragrance"],
    good_ingredients: ["Titanium Dioxide", "Zinc Oxide"],
  },
  {
    barcode_number: "8901234556789",
    product_name: "Aveda Invati Advanced Exfoliating Shampoo",
    product_image_url: "https://example.com/aveda-invati-shampoo.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Water",
      "Glycolic Acid",
      "Sodium Lauryl Sulfate",
      "Cocamidopropyl Betaine",
      "Aloe Vera",
    ],
    rating: 3,
    concerning_ingredients: ["Sodium Lauryl Sulfate"],
    good_ingredients: ["Aloe Vera", "Glycolic Acid"],
  },
  {
    barcode_number: "8901234567891",
    product_name: "Vichy Dercos Anti-Dandruff Shampoo",
    product_image_url: "https://example.com/vichy-dercos-shampoo.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Aqua",
      "Pyrithione Zinc",
      "Cocamidopropyl Betaine",
      "Fragrance",
      "Sodium Chloride",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Pyrithione Zinc"],
  },
  {
    barcode_number: "8901245678901",
    product_name: "Pond's White Beauty Cream",
    product_image_url: "https://example.com/ponds-white-beauty.jpg",
    category: "Skincare",
    subCategory: "Cream",
    all_ingredients: [
      "Niacinamide",
      "Titanium Dioxide",
      "Glyceryl Stearate",
      "Fragrance",
      "Butylphenyl Methylpropional",
    ],
    rating: 2,
    concerning_ingredients: [
      "Titanium Dioxide",
      "Fragrance",
      "Butylphenyl Methylpropional",
    ],
    good_ingredients: ["Niacinamide"],
  },
  {
    barcode_number: "8901256789012",
    product_name: "Khadi Natural Herbal Shampoo",
    product_image_url: "https://example.com/khadi-herbal-shampoo.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: ["Bhringraj", "Shikakai", "Amla", "Reetha", "Coconut Oil"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Bhringraj",
      "Shikakai",
      "Amla",
      "Reetha",
      "Coconut Oil",
    ],
  },
  {
    barcode_number: "8901267890123",
    product_name: "L'Oreal Paris HydraFresh Anti-Ox Grape Seed Hydrating Mask",
    product_image_url: "https://example.com/loreal-hydrafresh-mask.jpg",
    category: "Skincare",
    subCategory: "Mask",
    all_ingredients: [
      "Aqua",
      "Glycerin",
      "Grape Seed Extract",
      "Sodium Hyaluronate",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Grape Seed Extract", "Sodium Hyaluronate"],
  },
  {
    barcode_number: "8901324567890",
    product_name: "Biotique Bio Almond Oil",
    product_image_url: "https://example.com/biotique-almond-oil.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: [
      "Almond Oil",
      "Sesame Oil",
      "Brahmi Extract",
      "Amla Extract",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Almond Oil",
      "Sesame Oil",
      "Brahmi Extract",
      "Amla Extract",
    ],
  },
  {
    barcode_number: "8901335678901",
    product_name: "Himalaya Moisturizing Aloe Vera Gel",
    product_image_url: "https://example.com/himalaya-aloe-vera-gel.jpg",
    category: "Skincare",
    subCategory: "Gel",
    all_ingredients: [
      "Aloe Vera Extract",
      "Cucumber Extract",
      "Glycerin",
      "Xanthan Gum",
      "Sodium Benzoate",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Aloe Vera Extract", "Cucumber Extract", "Glycerin"],
  },
  {
    barcode_number: "8901346789012",
    product_name: "Lakmé Blush & Glow Face Wash",
    product_image_url: "https://example.com/lakme-blush-glow.jpg",
    category: "Skincare",
    subCategory: "Face Wash",
    all_ingredients: [
      "Glycerin",
      "Papaya Extract",
      "Lemon Extract",
      "Fragrance",
      "Sodium Lauryl Sulfate",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance", "Sodium Lauryl Sulfate"],
    good_ingredients: ["Glycerin", "Papaya Extract", "Lemon Extract"],
  },
  {
    barcode_number: "8901357890123",
    product_name: "Mamaearth Onion Hair Oil",
    product_image_url: "https://example.com/mamaearth-onion-hair-oil.jpg",
    category: "Haircare",
    subCategory: "Hair Oil",
    all_ingredients: [
      "Onion Oil",
      "Bhringraj Extract",
      "Amla Extract",
      "Castor Oil",
      "Almond Oil",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Onion Oil",
      "Bhringraj Extract",
      "Amla Extract",
      "Castor Oil",
      "Almond Oil",
    ],
  },
  {
    barcode_number: "8901368901234",
    product_name: "Pond's White Beauty Daily Spot-less Fairness Cream",
    product_image_url: "https://example.com/ponds-white-beauty.jpg",
    category: "Skincare",
    subCategory: "Fairness Cream",
    all_ingredients: [
      "Vitamin B3",
      "Niacinamide",
      "Glycerin",
      "Fragrance",
      "Titanium Dioxide",
    ],
    rating: 3,
    concerning_ingredients: ["Fragrance", "Titanium Dioxide"],
    good_ingredients: ["Vitamin B3", "Niacinamide", "Glycerin"],
  },
  {
    barcode_number: "8901379012345",
    product_name: "Nivea Soft Light Moisturizer",
    product_image_url: "https://example.com/nivea-soft-light.jpg",
    category: "Skincare",
    subCategory: "Moisturizer",
    all_ingredients: [
      "Water",
      "Glycerin",
      "Jojoba Oil",
      "Vitamin E",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Glycerin", "Jojoba Oil", "Vitamin E"],
  },
  {
    barcode_number: "8901380123456",
    product_name: "L'Oreal Paris Elvive Extraordinary Oil Shampoo",
    product_image_url: "https://example.com/loreal-elvive-shampoo.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Argan Oil",
      "Coconut Oil",
      "Sodium Laureth Sulfate",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Sodium Laureth Sulfate", "Fragrance"],
    good_ingredients: ["Argan Oil", "Coconut Oil"],
  },
  {
    barcode_number: "8901391234567",
    product_name: "Khadi Natural Hair Cleanser",
    product_image_url: "https://example.com/khadi-hair-cleanser.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Amla Extract",
      "Shikakai Extract",
      "Neem Extract",
      "Brahmi Extract",
      "Aloe Vera Extract",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Amla Extract",
      "Shikakai Extract",
      "Neem Extract",
      "Brahmi Extract",
      "Aloe Vera Extract",
    ],
  },
  {
    barcode_number: "8901402345678",
    product_name: "Biotique Bio Sandalwood Face Pack",
    product_image_url: "https://example.com/biotique-sandalwood-face-pack.jpg",
    category: "Skincare",
    subCategory: "Face Pack",
    all_ingredients: [
      "Sandalwood Extract",
      "Turmeric Extract",
      "Basil Extract",
      "Cinnamon Extract",
      "Aloe Vera",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Sandalwood Extract",
      "Turmeric Extract",
      "Basil Extract",
      "Cinnamon Extract",
      "Aloe Vera",
    ],
  },
  {
    barcode_number: "8901412345679",
    product_name: "Dove Hair Fall Rescue Shampoo",
    product_image_url: "https://example.com/dove-hair-fall-rescue.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Zinc Pyrithione",
      "Sodium Lauryl Sulfate",
      "Glycerin",
      "Fragrance",
      "Cocamidopropyl Betaine",
    ],
    rating: 4,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Fragrance"],
    good_ingredients: ["Zinc Pyrithione", "Glycerin", "Cocamidopropyl Betaine"],
  },
  {
    barcode_number: "8901423456780",
    product_name: "Patanjali Aloe Vera Gel",
    product_image_url: "https://example.com/patanjali-aloe-vera-gel.jpg",
    category: "Skincare",
    subCategory: "Gel",
    all_ingredients: [
      "Aloe Vera Extract",
      "Glycerin",
      "Carbomer",
      "Triethanolamine",
      "Sodium Benzoate",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Aloe Vera Extract", "Glycerin"],
  },
  {
    barcode_number: "8901434567891",
    product_name: "L'Oreal Paris Revitalift Crystal Fresh Hydrating Gel Cream",
    product_image_url: "https://example.com/loreal-revitalift-cream.jpg",
    category: "Skincare",
    subCategory: "Face Cream",
    all_ingredients: [
      "Glycerin",
      "Salicylic Acid",
      "Hyaluronic Acid",
      "Fragrance",
      "Cyclopentasiloxane",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance", "Cyclopentasiloxane"],
    good_ingredients: ["Glycerin", "Salicylic Acid", "Hyaluronic Acid"],
  },
  {
    barcode_number: "8901445678902",
    product_name: "Nivea Men Dark Spot Reduction Face Wash",
    product_image_url: "https://example.com/nivea-men-dark-spot.jpg",
    category: "Skincare",
    subCategory: "Face Wash",
    all_ingredients: ["Glycerin", "Vitamin C", "Citric Acid", "Fragrance"],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Glycerin", "Vitamin C", "Citric Acid"],
  },
  {
    barcode_number: "8901456789013",
    product_name: "Himalaya Herbals Anti-Hair Fall Shampoo",
    product_image_url: "https://example.com/himalaya-anti-hair-fall.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Bhringraj Extract",
      "Amla Extract",
      "Henna Extract",
      "Sodium Lauryl Sulfate",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Fragrance"],
    good_ingredients: ["Bhringraj Extract", "Amla Extract", "Henna Extract"],
  },
  {
    barcode_number: "8901467890124",
    product_name: "Biotique Bio Green Apple Shampoo",
    product_image_url: "https://example.com/biotique-green-apple.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Apple Extract",
      "Aloe Vera Extract",
      "Sodium Lauryl Sulfate",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Fragrance"],
    good_ingredients: ["Apple Extract", "Aloe Vera Extract"],
  },
  {
    barcode_number: "8901478901235",
    product_name: "The Body Shop Tea Tree Oil",
    product_image_url: "https://example.com/the-body-shop-tea-tree-oil.jpg",
    category: "Skincare",
    subCategory: "Face Oil",
    all_ingredients: ["Tea Tree Oil", "Alcohol Denat", "Limonene", "Linalool"],
    rating: 4,
    concerning_ingredients: ["Alcohol Denat", "Limonene", "Linalool"],
    good_ingredients: ["Tea Tree Oil"],
  },
  {
    barcode_number: "8901489012346",
    product_name: "Tata Harper Regenerating Cleanser",
    product_image_url: "https://example.com/tata-harper-cleanser.jpg",
    category: "Skincare",
    subCategory: "Cleanser",
    all_ingredients: [
      "Hyaluronic Acid",
      "Green Tea Extract",
      "Pomegranate Extract",
      "Jojoba Oil",
      "Lavender Oil",
    ],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: [
      "Hyaluronic Acid",
      "Green Tea Extract",
      "Pomegranate Extract",
      "Jojoba Oil",
      "Lavender Oil",
    ],
  },
  {
    barcode_number: "8901490123457",
    product_name: "Khadi Natural Rose Water",
    product_image_url: "https://example.com/khadi-rose-water.jpg",
    category: "Skincare",
    subCategory: "Toner",
    all_ingredients: ["Rose Extract", "Aqua", "Glycerin", "Sodium Benzoate"],
    rating: 5,
    concerning_ingredients: [],
    good_ingredients: ["Rose Extract", "Aqua", "Glycerin"],
  },
  {
    barcode_number: "8901578901235",
    product_name: "Patanjali Hair Conditioner",
    product_image_url: "https://example.com/patanjali-hair-conditioner.jpg",
    category: "Haircare",
    subCategory: "Conditioner",
    all_ingredients: [
      "Amla Extract",
      "Shikakai Extract",
      "Henna Extract",
      "Glycerin",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: [
      "Amla Extract",
      "Shikakai Extract",
      "Henna Extract",
      "Glycerin",
    ],
  },
  {
    barcode_number: "8901589012346",
    product_name: "The Body Shop Vitamin E Moisture Cream",
    product_image_url: "https://example.com/the-body-shop-vitamin-e.jpg",
    category: "Skincare",
    subCategory: "Moisturizer",
    all_ingredients: [
      "Vitamin E",
      "Glycerin",
      "Cetearyl Alcohol",
      "Fragrance",
      "Sodium Hydroxide",
    ],
    rating: 4,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Vitamin E", "Glycerin"],
  },
  {
    barcode_number: "8901590123457",
    product_name: "Himalaya Herbals Refreshing Cucumber Gel",
    product_image_url: "https://example.com/himalaya-cucumber-gel.jpg",
    category: "Skincare",
    subCategory: "Gel",
    all_ingredients: [
      "Cucumber Extract",
      "Aloe Vera Extract",
      "Glycerin",
      "Fragrance",
    ],
    rating: 5,
    concerning_ingredients: ["Fragrance"],
    good_ingredients: ["Cucumber Extract", "Aloe Vera Extract", "Glycerin"],
  },
  {
    barcode_number: "8901601234568",
    product_name: "L'Oreal Paris Extraordinary Oil Shampoo",
    product_image_url: "https://example.com/loreal-extraordinary-oil.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Argan Oil",
      "Coconut Oil",
      "Almond Oil",
      "Sodium Lauryl Sulfate",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Fragrance"],
    good_ingredients: ["Argan Oil", "Coconut Oil", "Almond Oil"],
  },
  {
    barcode_number: "8901612345679",
    product_name: "Pond's Pure White Anti-Pollution + Purity Face Wash",
    product_image_url: "https://example.com/ponds-pure-white.jpg",
    category: "Skincare",
    subCategory: "Face Wash",
    all_ingredients: [
      "Activated Charcoal",
      "Glycerin",
      "Fragrance",
      "Sodium Chloride",
    ],
    rating: 3,
    concerning_ingredients: ["Fragrance", "Sodium Chloride"],
    good_ingredients: ["Activated Charcoal", "Glycerin"],
  },
  {
    barcode_number: "8901623456780",
    product_name: "Biotique Bio Green Apple Shampoo",
    product_image_url: "https://example.com/biotique-green-apple.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Apple Extract",
      "Aloe Vera Extract",
      "Glycerin",
      "Sodium Lauryl Sulfate",
      "Fragrance",
    ],
    rating: 3,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Fragrance"],
    good_ingredients: ["Apple Extract", "Aloe Vera Extract", "Glycerin"],
  },
  {
    barcode_number: "8901634567891",
    product_name: "L'Oreal Paris Revitalift Crystal Micro-Essence",
    product_image_url: "https://example.com/loreal-revitalift-crystal.jpg",
    category: "Skincare",
    subCategory: "Essence",
    all_ingredients: [
      "Salicylic Acid",
      "Glycerin",
      "Dimethicone",
      "Fragrance",
      "Hyaluronic Acid",
    ],
    rating: 4,
    concerning_ingredients: ["Dimethicone", "Fragrance"],
    good_ingredients: ["Salicylic Acid", "Glycerin", "Hyaluronic Acid"],
  },
  {
    barcode_number: "8901645678902",
    product_name: "Khadi Natural Hair Cleanser",
    product_image_url: "https://example.com/khadi-hair-cleanser.jpg",
    category: "Haircare",
    subCategory: "Shampoo",
    all_ingredients: [
      "Bhringraj Extract",
      "Amla Extract",
      "Shikakai Extract",
      "Sodium Lauryl Sulfate",
      "Fragrance",
    ],
    rating: 4,
    concerning_ingredients: ["Sodium Lauryl Sulfate", "Fragrance"],
    good_ingredients: ["Bhringraj Extract", "Amla Extract", "Shikakai Extract"],
  },
];

module.exports = beautyProducts;
