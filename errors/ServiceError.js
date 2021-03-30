class ServiceError extends Error {
  constructor(message, httpStatusCode = 500, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
    this.name = "ServiceError";
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.date = new Date();
  }
}

module.exports = ServiceError;
