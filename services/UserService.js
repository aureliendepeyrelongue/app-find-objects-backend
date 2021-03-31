const Object = require("../models/Object");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 12;

class UserService {
  static getUsers() {}
  static async postUser(firstName, lastName, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = { firstName, lastName, email, password: hashedPassword };
      const postedUser = new User(user);
      const data = await postedUser.save();
      return data;
    } catch (err) {
      console.log(err);
      throw new ServiceError(
        "Erreur, impossible d'ajouter l'utilisateur à la base de donnée.",
        503
      );
    }
  }
}

module.exports = UserService;
