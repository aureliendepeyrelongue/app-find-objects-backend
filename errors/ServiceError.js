class ServiceError extends Error {
  constructor(message, code = 0, httpStatus = 0) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

module.exports = ServiceError;
