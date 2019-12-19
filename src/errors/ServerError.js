const GeneralError = require('./GeneralError');

module.exports = class ServerError extends GeneralError {
  constructor(code, errorFields, message) {
    super(code, errorFields, message || '服务器发生错误，请检查服务器。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }
};
