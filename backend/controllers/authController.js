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

// Get current user
exports.getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).json({ message: "Not authenticated" });
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