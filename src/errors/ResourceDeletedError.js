const GeneralError = require('./GeneralError');

module.exports = class ResourceDeletedError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '请求的资源被永久删除，且不会再得到的。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResourceDeletedError);
    }
  }
};
