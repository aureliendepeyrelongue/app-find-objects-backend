const express = require("express");
var objectRouter = express.Router();
const { body, validationResult } = require("express-validator");
const ObjectService = require("../services/ObjectService");
const UserService = require("../services/UserService");
const authMiddleware = require("../middlewares/authMiddleware");

objectRouter.use(authMiddleware);

objectRouter.get("/", async function (req, res, next) {
  try {
    const serviceAnswer = await ObjectService.getObjects();
    res.json(serviceAnswer);
  } catch (err) {
    next(err);
  }
});

objectRouter.get("/from-user", async function (req, res, next) {
  try {
    const serviceAnswer = await ObjectService.getObjectsFromUser(req.userId);
    res.json(serviceAnswer);
  } catch (err) {
    next(err);
  }
});

objectRouter.get("/:id", async function (req, res, next) {
  try {
    const serviceAnswer = await ObjectService.getObjectById(req.params.id);
    res.json(serviceAnswer);
  } catch (err) {
    next(err);
  }
});

objectRouter.put("/:id", async function (req, res, next) {
  try {
    const object = {
      state: req.body.state,
      location: req.body.location,
      category: req.body.category,
      when: req.body.when,
    };
    const serviceAnswer = await ObjectService.updateObjectById(
      object,
      req.params.id
    );
    res.json(serviceAnswer);
  } catch (err) {
    next(err);
  }
});

objectRouter.delete("/:id", async function (req, res, next) {
  try {
    const serviceAnswer = await ObjectService.deleteObjectById(req.params.id);
    res.json(serviceAnswer);
  } catch (err) {
    next(err);
  }
});

objectRouter.post("/", async function (req, res, next) {
  const object = {
    state: req.body.state,
    location: req.body.location,
    category: req.body.category,
    when: req.body.when,
  };

  try {
    console.log(req.userId);
    //const user = await UserService.getUserById(req.userId);
    const serviceAnswer = await ObjectService.postObject(object, req.userId);
    res.json(serviceAnswer);
  } catch (err) {
    next(err);
  }
});

module.exports = objectRouter;
