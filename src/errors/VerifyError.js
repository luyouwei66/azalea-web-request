const GeneralError = require('./GeneralError');

module.exports = class VerifyError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '当创建一个对象时，发生一个验证错误。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VerifyError);
    }
  }
};
