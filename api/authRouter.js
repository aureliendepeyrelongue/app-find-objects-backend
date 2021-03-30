var express = require("express");
var authRouter = express.Router();

// define the home page route
authRouter.get("/", function (req, res) {
  res.send("authentication home page");
});
// define the about route
authRouter.get("/about", function (req, res) {
  res.send("About authentication");
});

module.exports = authRouter;
