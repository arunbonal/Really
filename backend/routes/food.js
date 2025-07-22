const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const foodController = require("../controllers/foodController.js");
const authController = require("../controllers/authController.js");

router.get("/", wrapAsync(foodController.home));

// Use optional authentication to allow requests but still track scans when authenticated
router.get("/search/:barcodeNumber", authController.optionalAuth, wrapAsync(foodController.search));
router.get("/:barcodeNumber", authController.optionalAuth, wrapAsync(foodController.search));

module.exports = router;
