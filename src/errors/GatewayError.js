const GeneralError = require('./GeneralError');

module.exports = class GatewayError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '网关错误');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GatewayError);
    }
  }
};
