const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: String,
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  image: String,

  // Previous Scans for all product types
  scans: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      category: { type: String, enum: ["medicine", "food", "beauty"] },
      scanDate: { type: Date, default: Date.now },
    },
  ],

  // Saved Searches
  savedSearches: [
    {
      query: String,
      category: { type: String, enum: ["medicine", "food", "beauty"] },
      savedAt: { type: Date, default: Date.now },
    },
  ],

  // Ratings & Reviews
  reviews: [
    {
      productId: mongoose.Schema.Types.ObjectId, // References Product model
      category: { type: String, enum: ["medicine", "food", "beauty"] },
      rating: { type: Number, min: 1, max: 5 },
      reviewText: String,
      reviewedAt: { type: Date, default: Date.now },
    },
  ],

  // User Contributions (submitting product details, corrections)
  contributions: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      category: { type: String, enum: ["medicine", "food", "beauty"] },
      contributionType: String, // "edit", "add new", "report issue"
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      submittedAt: { type: Date, default: Date.now },
    },
  ],

  // Liked Products
  likedProducts: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      category: { type: String, enum: ["medicine", "food", "beauty"] },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
