'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('es6-symbol/implement');
var fetch = require('isomorphic-unfetch');
var cloneDeep = require('lodash/cloneDeep');
var assign = require('lodash/assign');

var _require = require('./errors/index'),
    createError = _require.createError,
    GeneralError = _require.GeneralError,
    ServerUnreachableError = _require.ServerUnreachableError;

global.azaleaWebRequestSettings = {
  extraHeaders: undefined,
  extraParams: undefined,
  hostName: ''
};

var configRequest = function configRequest(options) {
  if (!options) {
    return;
  }

  if (_typeof(options.extraHeaders) === 'object' || typeof options.extraHeaders === 'function') {
    global.azaleaWebRequestSettings.extraHeaders = options.extraHeaders;
  }

  if (_typeof(options.extraParams) === 'object' || typeof options.extraParams === 'function') {
    global.azaleaWebRequestSettings.extraParams = options.extraParams;
  }

  if (typeof options.hostName === 'string' || typeof options.hostName === 'function') {
    global.azaleaWebRequestSettings.hostName = options.hostName;
  }

  if (typeof options.interceptor === 'function') {
    global.azaleaWebRequestSettings.interceptor = options.interceptor;
  }
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.json().then(function (result) {
      var json = cloneDeep(result);
      throw createError(response.status, json);
    }).catch(function (error) {
      throw createError(response.status, null, error.message);
    });
  }
}

var buildBody = function buildBody(options) {
  if (options.contentType === 'json') {
    return buildBodyJson(options);
  } else {
    return buildBodyFormData(options);
  }
};

var buildBodyJson = function buildBodyJson(options) {
  var params = options.params || {};
  return JSON.stringify(params);
};

var buildBodyFormData = function buildBodyFormData(options) {
  var body = [];
  for (var key in options.params) {
    if (Object.prototype.hasOwnProperty.call(options.params, key)) {
      if (options.params[key] || options.params[key] === 0 || typeof options.params[key] === 'boolean') {
        body.push(key + '=' + encodeURIComponent(options.params[key]));
      } else {
        body.push('' + key);
      }
    }
  }
  return body.join('&');
};

var buildQuery = function buildQuery(options) {
  var query = '';
  if (options.params) {
    Object.keys(options.params).sort().forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(options.params, key)) {
        var pe = function pe() {
          return query ? '&' : '?';
        };
        if (options.params[key] || options.params[key] === 0 || typeof options.params[key] === 'boolean') {
          query += '' + pe() + key + '=' + encodeURIComponent(options.params[key]);
        } else if (options.transferEmptyKey) {
          query += '' + pe() + key;
        }
      }
    });
  }

  return query;
};

var realRequest = function realRequest(resolve, reject, url, options) {
  fetch(url, options).then(function (res) {
    console.info('response result ==> ', res); // eslint-disable-line no-console
    var settings = global.azaleaWebRequestSettings;
    if (typeof settings.interceptor === 'function') {
      settings.interceptor(res); // 拦截器
    }
    return checkStatus(res);
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    var json = cloneDeep(result);
    console.info('response json ==> ', json, '--->'+options.originPath); // eslint-disable-line no-console
    if (json && json.code && !options.pullCode) {
      throw createError(json.code, json, json.message);
    }
    resolve(options.pullCode ? json : json.data);
  }).catch(function (error) {
    if (error instanceof ServerUnreachableError && options.retryTimes < 3) {
      options.retryTimes += 1; // eslint-disable-line no-param-reassign
      options.originOptions.retryTimes = options.retryTimes; // eslint-disable-line
      setTimeout(function () {
        requestPreHandler(resolve, reject, options.originPath, options.originOptions);
      }, 2000);
    } else if (error instanceof GeneralError) {
      reject(error);
    } else {
      reject(createError(-1, null, error.message));
    }
  });
};

var commonHeaders = function commonHeaders(options, requestDate) {
  // eslint-disable-line no-unused-vars
  if (options.contentType === 'json') {
    return {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=UTF-8'
    };
  } else {
    return {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
  }
};

var addExtraHeaders = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var settings, extraHeaders;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', undefined);

          case 2:
            settings = global.azaleaWebRequestSettings;

            if (!(_typeof(settings.extraHeaders) === 'object')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', assign({}, settings.extraHeaders, options.headers));

          case 7:
            if (!(typeof settings.extraHeaders === 'function')) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return settings.extraHeaders();

          case 10:
            extraHeaders = _context.sent;
            return _context.abrupt('return', assign({}, extraHeaders, options.headers));

          case 12:
            return _context.abrupt('return', options.headers);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addExtraHeaders(_x) {
    return _ref.apply(this, arguments);
  };
}();

var addExtraParams = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
    var settings, extraParams;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (options) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', undefined);

          case 2:
            settings = global.azaleaWebRequestSettings;

            if (!(_typeof(settings.extraParams) === 'object')) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', assign({}, settings.extraParams, options.params));

          case 7:
            if (!(typeof settings.extraParams === 'function')) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return settings.extraParams();

          case 10:
            extraParams = _context2.sent;
            return _context2.abrupt('return', assign({}, extraParams, options.params));

          case 12:
            return _context2.abrupt('return', options.params);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addExtraParams(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var prepareOptions = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(requestDate, options, preCallbackResult) {
    var newOptions, defaultHeaders, key, _key;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newOptions = options ? cloneDeep(options) : {};

            if (!(typeof newOptions.params === 'function')) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return newOptions.params(preCallbackResult);

          case 4:
            newOptions.params = _context3.sent;

          case 5:
            defaultHeaders = commonHeaders(newOptions, requestDate);


            if (options) {
              newOptions.headers = assign({}, defaultHeaders, options.headers);
            } else {
              newOptions.headers = defaultHeaders;
            }

            if (!newOptions.method) {
              newOptions.method = 'GET'; // default GET
            }

            newOptions.credentials = 'omit'; // CORS
            if (!newOptions.params) {
              newOptions.params = {};
            }

            newOptions.retryTimes = options && options.retryTimes || 0;
            newOptions.originOptions = cloneDeep(options);

            _context3.next = 14;
            return addExtraHeaders(newOptions);

          case 14:
            newOptions.headers = _context3.sent;
            _context3.next = 17;
            return addExtraParams(newOptions);

          case 17:
            newOptions.params = _context3.sent;

            if (options) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt('return', newOptions);

          case 20:

            if (options.avoidExtraHeaders) {
              for (key in options.avoidExtraHeaders) {
                delete newOptions.headers[options.avoidExtraHeaders[key]];
              }
            }

            if (options.avoidExtraParams) {
              for (_key in options.avoidExtraParams) {
                delete newOptions.params[options.avoidExtraParams[_key]];
              }
            }

            return _context3.abrupt('return', newOptions);

          case 23:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function prepareOptions(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var requestHandler = function requestHandler(resolve, reject, path, options, preCallbackResult) {
  var requestDate = new Date();
  var url = '';
  var settings = global.azaleaWebRequestSettings;
  if(path.substr(0,6)=='https:'|| path.substr(0,5)=='http:'){
    url = path;
  }else if (options && typeof options.hostName === 'string') {
    url = '' + options.hostName + path;
  }else if (options && typeof options.hostName === 'function') {
    url = '' + options.hostName() + path;
  } else if (typeof settings.hostName === 'string') {
    let newHostName = options.newApi ? settings.hostName.replace('api/api', 'api/' + options.newApi + '/api') : options.splitMilieu ? options.splitMilieu : settings.hostName;
    url = '' + newHostName + path;
    //url = '' + settings.hostName + path;
  } else if (typeof settings.hostName === 'function') {
    url = '' + settings.hostName() + path;
  }
  prepareOptions(requestDate, options, preCallbackResult).then(function (newOptions) {
    newOptions.originPath = path; // eslint-disable-line no-param-reassign

    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      newOptions.body = buildBody(newOptions); // eslint-disable-line no-param-reassign
    } else {
      newOptions.body = undefined; // eslint-disable-line no-param-reassign
      url += buildQuery(newOptions);
    }

    console.info('request url ==> ', url); // eslint-disable-line no-console
    console.info('request options ==> ', newOptions); // eslint-disable-line no-console
    realRequest(resolve, reject, url, newOptions);
  });
};

var requestPreHandler = function requestPreHandler(resolve, reject, path, options) {
  if (options && options.preCallback) {
    options.preCallback().then(function (result) {
      requestHandler(resolve, reject, path, options, result);
    });
  } else {
    requestHandler(resolve, reject, path, options);
  }
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} path       The path we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(path, options) {
  return new Promise(function (resolve, reject) {
    requestPreHandler(resolve, reject, path, options);
  });
}

module.exports = {
  configRequest: configRequest,
  request: request
};