const Object = require("../models/Object");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const ServiceError = require("../errors/ServiceError");
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
      throw new ServiceError(
        "Erreur, impossible d'ajouter l'utilisateur à la base de donnée.",
        err.code
      );
    }
  }
  static async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new ServiceError(
          "Erreur, impossible d'authentifier l'utilisateur.",
          0,
          401
        );
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new ServiceError(
          "Erreur, impossible d'authentifier l'utilisateur.",
          0,
          401
        );
      }
      return user;
    } catch (err) {
      console.error(err.stack);
      throw new ServiceError(
        "Erreur, impossible d'authentifier l'utilisateur.",
        err.code,
        401
      );
    }
  }
}

module.exports = UserService;
