module.exports = class GeneralError extends Error {
  constructor(code, errorFields, message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeneralError);
    }

    this._code = code;
    this._errorFields = errorFields;
  }

  get code() {
    return this._code;
  }

  get errorFields() {
    return this._errorFields;
  }
};
