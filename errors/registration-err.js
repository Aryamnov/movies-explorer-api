const { CONFLICT } = require('../utils/err-status').Status;

class RegistrationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = RegistrationError;
