'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralError = require('./GeneralError');

module.exports = function (_GeneralError) {
  _inherits(PermissionDeniedError, _GeneralError);

  function PermissionDeniedError(code, errorFields) {
    _classCallCheck(this, PermissionDeniedError);

    var _this = _possibleConstructorReturn(this, (PermissionDeniedError.__proto__ || Object.getPrototypeOf(PermissionDeniedError)).call(this, code, errorFields, '用户得到授权，但是访问是被禁止的。'));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, PermissionDeniedError);
    }
    return _this;
  }

  return PermissionDeniedError;
}(GeneralError);