const GeneralError = require('./GeneralError');

module.exports = class UnauthorizationError extends GeneralError {
  constructor(code, errorFields, message) {
    super(code, errorFields, message || '用户没有权限（令牌、用户名、密码错误）。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizationError);
    }
  }
};
