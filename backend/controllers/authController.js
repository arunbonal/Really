const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

// Handle Google authentication
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Handle Google authentication callback
exports.googleAuthCallback = [
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("Logged in successfully");
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  }
];

// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
};

// Optional authentication - allows request to continue even if not authenticated
exports.optionalAuth = (req, res, next) => {
  // Just pass through - authentication is optional
  next();
};

// Get current user
exports.getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).json({ message: "Not authenticated" });
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  console.log("=== GET USER STATS REQUEST ===");
  console.log("User authenticated:", req.isAuthenticated());
  console.log("User:", req.user ? req.user._id : "No user");
  console.log("Session:", req.session);
  
  if (!req.isAuthenticated()) {
    console.log("User not authenticated, returning 401");
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = req.user;
    console.log("Getting stats for user:", user._id);
    console.log("User scans:", user.scans);
    
    // Calculate statistics
    const totalScans = user.scans.length;
    const foodScans = user.scans.filter(scan => scan.category === "food").length;
    const beautyScans = user.scans.filter(scan => scan.category === "beauty").length;
    const medsScans = user.scans.filter(scan => scan.category === "meds").length;
    
    // Get all scans sorted by date (most recent first)
    const allScans = user.scans
      .sort((a, b) => new Date(b.scanDate) - new Date(a.scanDate));

    const stats = {
      totalScans,
      foodScans,
      beautyScans,
      medsScans,
      recentScans: allScans, // Return all scans instead of just 5
      savedSearches: user.savedSearches.length,
      reviews: user.reviews.length
    };

    console.log("Returning stats:", stats);
    res.json(stats);
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({ message: "Error fetching user statistics" });
  }
};

// Delete all user scans
exports.deleteAllScans = async (req, res) => {
  console.log("=== DELETE ALL SCANS REQUEST ===");
  console.log("User authenticated:", req.isAuthenticated());
  console.log("User:", req.user ? req.user._id : "No user");
  console.log("Category filter:", req.query.category);
  
  if (!req.isAuthenticated()) {
    console.log("User not authenticated, returning 401");
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = req.user;
    const category = req.query.category;
    
    console.log("Deleting scans for user:", user._id);
    console.log("Current scans count:", user.scans.length);
    
    let deletedCount = 0;
    
    if (category) {
      // Delete scans for specific category
      const originalCount = user.scans.length;
      user.scans = user.scans.filter(scan => scan.category !== category);
      deletedCount = originalCount - user.scans.length;
      console.log(`Deleted ${deletedCount} scans for category: ${category}`);
    } else {
      // Delete all scans
      deletedCount = user.scans.length;
      user.scans = [];
      console.log("All scans deleted successfully");
    }
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: category ? `${category} scans deleted successfully` : "All scans deleted successfully",
      deletedCount: deletedCount
    });
  } catch (error) {
    console.error("Error deleting scans:", error);
    res.status(500).json({ message: "Error deleting scans" });
  }
};

// Logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("/");
  });
};