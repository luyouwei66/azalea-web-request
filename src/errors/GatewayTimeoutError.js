const GeneralError = require('./GeneralError');

module.exports = class GatewayTimeoutError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '请求超时，请稍候重试。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GatewayTimeoutError);
    }
  }
};
