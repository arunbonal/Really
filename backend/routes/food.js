const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const foodController = require("../controllers/foodController.js");

router.get("/", wrapAsync(foodController.home));

router.get("/search/:barcodeNumber", wrapAsync(foodController.search));

module.exports = router;
