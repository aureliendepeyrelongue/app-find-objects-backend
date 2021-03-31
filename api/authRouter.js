var express = require("express");
var authRouter = express.Router();
const UserService = require("../services/UserService");

// define the authentication routes
authRouter.post("/registration", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const serviceAnswer = await UserService.postUser(
      firstName,
      lastName,
      email,
      password
    );
    res.json(serviceAnswer);
  } catch (err) {
    res.status(err.httpStatusCode).json({ err: err.message });
  }
});
authRouter.get("/registration", function (req, res) {
  res.send("registration home page");
});

authRouter.get("/", function (req, res) {
  res.send("authentication home page");
});

module.exports = authRouter;
