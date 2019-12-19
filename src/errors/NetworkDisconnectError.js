const GeneralError = require('./GeneralError');

module.exports = class NetworkDisconnectError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '网络出错。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkDisconnectError);
    }
  }
};
