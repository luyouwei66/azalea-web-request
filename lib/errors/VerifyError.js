'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralError = require('./GeneralError');

module.exports = function (_GeneralError) {
  _inherits(VerifyError, _GeneralError);

  function VerifyError(code, errorFields) {
    _classCallCheck(this, VerifyError);

    var _this = _possibleConstructorReturn(this, (VerifyError.__proto__ || Object.getPrototypeOf(VerifyError)).call(this, code, errorFields, '当创建一个对象时，发生一个验证错误。'));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, VerifyError);
    }
    return _this;
  }

  return VerifyError;
}(GeneralError);