const { INTERNAL } = require('../utils/err-status').Status;

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL;
  }
}

module.exports = ServerError;
