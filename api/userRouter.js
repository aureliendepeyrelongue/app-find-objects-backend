var express = require("express");
var userRouter = express.Router();
var authMiddleware = require("../middlewares/authMiddleware");
// middleware that is specific to this userRouter
userRouter.use(authMiddleware);
// define the home page route
userRouter.get("/", function (req, res) {
  res.send("user home page");
});
// define the about route
userRouter.post("/", function (req, res) {
  res.send("user home page");
});

module.exports = userRouter;
