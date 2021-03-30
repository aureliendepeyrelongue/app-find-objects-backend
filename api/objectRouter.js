const express = require("express");
var objectRouter = express.Router();
const { body, validationResult } = require("express-validator");
const ObjectService = require("../services/ObjectService");
const authMiddleware = require("../middlewares/authMiddleware");

objectRouter.use(authMiddleware);

objectRouter.get("/", async function (req, res) {
  try {
    const serviceAnswer = await ObjectService.getObjects();
    res.json(serviceAnswer);
  } catch (err) {
    res.status(err.httpStatusCode).json({ err: err.message });
  }
});

objectRouter.post("/", async function (req, res) {
  const object = {
    state: req.body.state,
    location: req.body.location,
    category: req.body.category,
    when: req.body.when,
  };

  try {
    const serviceAnswer = await ObjectService.postObject(object);
    res.json(serviceAnswer);
  } catch (err) {
    res.status(err.httpStatusCode).json({ err: err.message });
  }
});

module.exports = objectRouter;
