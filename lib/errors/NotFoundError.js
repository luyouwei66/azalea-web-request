'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralError = require('./GeneralError');

module.exports = function (_GeneralError) {
  _inherits(NotFoundError, _GeneralError);

  function NotFoundError(code, errorFields) {
    _classCallCheck(this, NotFoundError);

    var _this = _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).call(this, code, errorFields, '发出的请求针对的是不存在的记录，服务器没有进行操作。'));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, NotFoundError);
    }
    return _this;
  }

  return NotFoundError;
}(GeneralError);