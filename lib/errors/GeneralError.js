"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

module.exports = function (_extendableBuiltin2) {
  _inherits(GeneralError, _extendableBuiltin2);

  function GeneralError(code, errorFields, message) {
    _classCallCheck(this, GeneralError);

    var _this = _possibleConstructorReturn(this, (GeneralError.__proto__ || Object.getPrototypeOf(GeneralError)).call(this, message));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, GeneralError);
    }

    _this._code = code;
    _this._errorFields = errorFields;
    return _this;
  }

  _createClass(GeneralError, [{
    key: "code",
    get: function get() {
      return this._code;
    }
  }, {
    key: "errorFields",
    get: function get() {
      return this._errorFields;
    }
  }]);

  return GeneralError;
}(_extendableBuiltin(Error));