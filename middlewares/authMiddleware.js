const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.userId;
    console.log("success de l'authentification.");
    next();
  } catch (err) {
    var errToSend = {
      name: "TokenExpiredError",
      message: "jwt expired",
      expiredAt: Date.now,
    };
    res.status(401).json(err);
  }
}

module.exports = authMiddleware;
