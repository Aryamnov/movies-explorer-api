const { UNAUTHORIZED } = require('../utils/err-status').Status;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
