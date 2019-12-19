'use strict';

var GeneralError = require('./GeneralError');
var RequestError = require('./RequestError');
var UnauthorizationError = require('./UnauthorizationError');
var PermissionDeniedError = require('./PermissionDeniedError');
var NotFoundError = require('./NotFoundError');
var FormatError = require('./FormatError');
var ResourceDeletedError = require('./ResourceDeletedError');
var VerifyError = require('./VerifyError');
var ServerError = require('./ServerError');
var GatewayError = require('./GatewayError');
var ServerUnreachableError = require('./ServerUnreachableError');
var GatewayTimeoutError = require('./GatewayTimeoutError');
var NetworkDisconnectError = require('./NetworkDisconnectError');
var SystemError = require('./SystemError');

module.exports = {
  createError: function createError(code, payload, message) {
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
  GeneralError: GeneralError,
  RequestError: RequestError,
  UnauthorizationError: UnauthorizationError,
  NotFoundError: NotFoundError,
  FormatError: FormatError,
  ResourceDeletedError: ResourceDeletedError,
  VerifyError: VerifyError,
  ServerError: ServerError,
  GatewayError: GatewayError,
  ServerUnreachableError: ServerUnreachableError,
  GatewayTimeoutError: GatewayTimeoutError,
  NetworkDisconnectError: NetworkDisconnectError,
  SystemError: SystemError
};