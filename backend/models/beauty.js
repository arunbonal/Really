const mongoose = require("mongoose");

const beautySchema = new mongoose.Schema({
  barcodeNumber: {
    type: Number,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImageUrl: {
    url: String,
    filename: String,
  },
  caetgory: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  allIngredients: [
    {
      type: Array,
    },
  ],
  concerningIngredients: [
    {
      type: Array,
    },
  ],
});

const Beauty = mongoose.model("Beauty", beautySchema);

module.exports = Beauty;
