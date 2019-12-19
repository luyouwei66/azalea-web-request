'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralError = require('./GeneralError');

module.exports = function (_GeneralError) {
  _inherits(RequestError, _GeneralError);

  function RequestError(code, errorFields) {
    _classCallCheck(this, RequestError);

    var _this = _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this, code, errorFields, '发出的请求有错误，服务器没有进行新建或修改数据的操作。'));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, RequestError);
    }
    return _this;
  }

  return RequestError;
}(GeneralError);