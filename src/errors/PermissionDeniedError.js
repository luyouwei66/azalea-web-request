const GeneralError = require('./GeneralError');

module.exports = class PermissionDeniedError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '用户得到授权，但是访问是被禁止的。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PermissionDeniedError);
    }
  }
};
