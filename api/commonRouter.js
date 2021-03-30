var express = require("express");
var commonRouter = express.Router();

// define the home page route
commonRouter.get("/", function (req, res) {
  res.send("common home page");
});
// define the about route
commonRouter.get("/about", function (req, res) {
  res.send("About common");
});

module.exports = commonRouter;
