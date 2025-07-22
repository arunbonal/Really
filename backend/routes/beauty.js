const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const beautyController = require("../controllers/beautyController.js");
const authController = require("../controllers/authController.js");

router.get("/", wrapAsync(beautyController.home));
router.get("/search/:barcodeNumber", authController.optionalAuth, wrapAsync(beautyController.search));
router.get("/:barcodeNumber", authController.optionalAuth, wrapAsync(beautyController.search));

module.exports = router;
