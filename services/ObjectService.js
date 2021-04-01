const { post } = require("../api/authRouter");
const Object = require("../models/Object");
const User = require("../models/User");

const ServiceError = require("../errors/ServiceError");
const UserService = require("./UserService");

class ObjectService {
  static async postObject(object, userId) {
    try {
      object.user = userId;
      const postedObject = new Object(object);
      const data = await postedObject.save();
      return data;
    } catch (err) {
      console.log(err);
      throw new ServiceError(
        "Erreur, impossible d'ajouter l'objet à la base de donnée.",
        503
      );
    }
  }
  static async updateObjectById(object, objectId) {
    try {
      let answer = await Object.findOneAndUpdate({ _id: objectId }, object);
      return answer;
    } catch (err) {
      console.log(err);
      throw new ServiceError(
        "Erreur, impossible de mettre à jour l'objet dans la base de donnée.",
        503
      );
    }
  }
  static async getObjects() {
    try {
      const objects = await Object.find().populate("user", {
        firstName: 1,
        lastName: 1,
      });
      return objects;
    } catch (err) {
      console.log(err);
      throw new ServiceError(
        "Erreur, impossible d'obtenir les objets de la base de donnée.",
        503
      );
    }
  }
  static async getObjectById(objectId) {
    try {
      const object = await Object.findOne({ _id: objectId });
      return object;
    } catch (err) {
      throw new ServiceError(
        "Erreur, impossible d'obtenir l'objet de la base de donnée.",
        err.code
      );
    }
  }
  static async getObjectsFromUser(userId) {
    try {
      const objects = await Object.find({ user: userId });
      return objects;
    } catch (err) {
      console.log(err);
      throw new ServiceError(
        "Erreur, impossible d'obtenir les objets de la base de donnée.",
        503
      );
    }
  }
  static async getObjectsByRange(startRange, endRange) {
    return [];
  }
}

module.exports = ObjectService;
