const GeneralError = require('./GeneralError');

module.exports = class FormatError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '请求的格式不可得。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormatError);
    }
  }
};
