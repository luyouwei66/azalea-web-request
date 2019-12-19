var request = require('./lib/request');
var Errors = require('./lib/errors/index');

module.exports = {
  request: request.request,
  configRequest: request.configRequest,
  Errors: Errors,
};
