const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const beautyController = require("../controllers/beautyController.js");

router.get("/", wrapAsync(beautyController.home));

module.exports = router;
