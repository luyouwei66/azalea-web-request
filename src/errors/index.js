const GeneralError = require('./GeneralError');
const RequestError = require('./RequestError');
const UnauthorizationError = require('./UnauthorizationError');
const PermissionDeniedError = require('./PermissionDeniedError');
const NotFoundError = require('./NotFoundError');
const FormatError = require('./FormatError');
const ResourceDeletedError = require('./ResourceDeletedError');
const VerifyError = require('./VerifyError');
const ServerError = require('./ServerError');
const GatewayError = require('./GatewayError');
const ServerUnreachableError = require('./ServerUnreachableError');
const GatewayTimeoutError = require('./GatewayTimeoutError');
const NetworkDisconnectError = require('./NetworkDisconnectError');
const SystemError = require('./SystemError');

module.exports = {
  createError: function (code, payload, message) {
    switch (code) {
      case -1:
        return new NetworkDisconnectError(code, payload);
      case 400:
        return new RequestError(code, payload);
      case 401:
        return new UnauthorizationError(code, payload, message);
      case 403:
        return new PermissionDeniedError(code, payload);
      case 404:
        return new NotFoundError(code, payload);
      case 406:
        return new FormatError(code, payload);
      case 410:
        return new ResourceDeletedError(code, payload);
      case 422:
        return new VerifyError(code, payload);
      case 500:
        return new ServerError(code, payload, message);
      case 502:
        return new GatewayError(code, payload);
      case 503:
        return new ServerUnreachableError(code, payload);
      case 504:
        return new GatewayTimeoutError(code, payload);
      default:
        return new SystemError(code, payload, message);
    }
  },
  GeneralError,
  RequestError,
  UnauthorizationError,
  NotFoundError,
  FormatError,
  ResourceDeletedError,
  VerifyError,
  ServerError,
  GatewayError,
  ServerUnreachableError,
  GatewayTimeoutError,
  NetworkDisconnectError,
  SystemError,
};

