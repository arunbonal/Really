const beautyProducts = require("../init/beautyData");

// home route
module.exports.home = async (req, res) => {
  res.json(beautyProducts);
};
