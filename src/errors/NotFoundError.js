const GeneralError = require('./GeneralError');

module.exports = class NotFoundError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '发出的请求针对的是不存在的记录，服务器没有进行操作。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
};
