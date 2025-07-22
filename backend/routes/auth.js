const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route: Redirect to Google OAuth
router.get("/google", authController.googleAuth);

// Route: Google OAuth Callback
router.get("/google/callback", authController.googleAuthCallback);

// Get current user
router.get("/user", authController.isAuthenticated, authController.getCurrentUser);

// Get user statistics
router.get("/stats", authController.isAuthenticated, authController.getUserStats);

// Test authentication endpoint
router.get("/test", (req, res) => {
  console.log("=== TEST AUTH ENDPOINT ===");
  console.log("User authenticated:", req.isAuthenticated());
  console.log("User:", req.user ? req.user._id : "No user");
  console.log("Session:", req.session);
  res.json({
    authenticated: req.isAuthenticated(),
    userId: req.user ? req.user._id : null,
    sessionId: req.sessionID
  });
});

// Delete all user scans
router.delete("/scans", authController.isAuthenticated, authController.deleteAllScans);

// Logout
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);

module.exports = router; 