const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route: Redirect to Google OAuth
router.get("/google", authController.googleAuth);

// Route: Google OAuth Callback
router.get("/google/callback", authController.googleAuthCallback);

// Get current user
router.get("/user", authController.isAuthenticated, authController.getCurrentUser);

// Logout
router.get("/logout", authController.logout);

module.exports = router; 