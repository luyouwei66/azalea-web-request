const GeneralError = require('./GeneralError');

module.exports = class ServerUnreachableError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '服务不可用，服务器暂时过载或维护。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerUnreachableError);
    }
  }
};
