const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const medsController = require("../controllers/medsController.js");

router.get("/", wrapAsync(medsController.home));
router.get("/:medsName", wrapAsync(medsController.search));

module.exports = router;
