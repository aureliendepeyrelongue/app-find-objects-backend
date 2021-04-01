var express = require("express");
var authRouter = express.Router();
const UserService = require("../services/UserService");
const { body, check, validationResult } = require("express-validator");

// define the authentication routes
authRouter.post(
  "/registration",

  body("email", "emailError").isEmail(),
  body("password", "passwordLengthError").isLength({ min: 6 }),
  body("confirmPassword", "emailError")
    .exists()
    .custom((value, { req }) => value === req.body.password),

  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      next(err);
    }
  }
);

authRouter.post(
  "/login",

  body("email", "emailError").isEmail(),
  body("password", "passwordLengthError").isLength({ min: 6 }),

  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await UserService.authenticateUser(email, password);
      const token = await UserService.generateUserToken(user);

      res.json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  }
);

authRouter.get("/registration", function (req, res) {
  res.send("registration home page");
});

authRouter.get("/", function (req, res) {
  res.send("authentication home page");
});

module.exports = authRouter;
