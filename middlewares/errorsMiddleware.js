module.exports = function errorsMiddleware(error, req, res, next) {
  console.error(error.stack);
  var httpStatus = 500;
  if (error.httpStatus) {
    httpStatus = error.httpStatus;
  }
  res
    .status(httpStatus)
    .json({ error: { message: error.message, code: error.code } });
};
