const { post } = require("../api/authRouter");
const Object = require("../models/Object");
const User = require("../models/User");

const ServiceError = require("../errors/ServiceError");

class ObjectService {
  static async postObject(object) {
    try {
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
  static async getObjects() {
    try {
      const objects = await Object.find();
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
