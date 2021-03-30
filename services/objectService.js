const { post } = require("../api/authRouter");
const Object = require("../models/Object");
const User = require("../models/User");

const ServiceError = require("../errors/ServiceError");

const objectService = {
  async postObject(object) {
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
  },
  async getObjects() {
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
  },
  getObjectsByRange(startRange, endRange) {
    return [];
  },
};

module.exports = objectService;
