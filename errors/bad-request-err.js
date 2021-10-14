const { BAD_REQUEST } = require('../utils/err-status').Status;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
