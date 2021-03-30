function authMiddleware(req, res, next) {
  console.log("Authentication required");
  next();
}

module.exports = authMiddleware;
