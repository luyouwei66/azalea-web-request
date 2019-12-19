const GeneralError = require('./GeneralError');

module.exports = class RequestError extends GeneralError {
  constructor(code, errorFields) {
    super(code, errorFields, '发出的请求有错误，服务器没有进行新建或修改数据的操作。');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }
  }
};
