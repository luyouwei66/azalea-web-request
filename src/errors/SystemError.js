const GeneralError = require('./GeneralError');

module.exports = class SystemError extends GeneralError {
  constructor(code, errorFields, message) {
    super(code, errorFields, message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SystemError);
    }
  }
};
