require('es6-symbol/implement');
const fetch = require('isomorphic-unfetch');
const cloneDeep = require('lodash/cloneDeep');
const assign = require('lodash/assign');
const { createError, GeneralError, ServerUnreachableError } = require('./errors/index');

global.azaleaWebRequestSettings = {
  extraHeaders: undefined,
  extraParams: undefined,
  hostName: '',
};

const configRequest = (options) => {
  if (!options) {
    return;
  }

  if (typeof(options.extraHeaders) === 'object' || typeof(options.extraHeaders) === 'function') {
    global.azaleaWebRequestSettings.extraHeaders = options.extraHeaders;
  }

  if (typeof(options.extraParams) === 'object' || typeof(options.extraParams) === 'function') {
    global.azaleaWebRequestSettings.extraParams = options.extraParams;
  }

  if (typeof(options.hostName) === 'string' || typeof(options.hostName) === 'function') {
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
    return response.json().then((result) => {
      const json = cloneDeep(result);
      throw createError(response.status, json);
    }).catch((error) => {
      throw createError(response.status, null, error.message);
    });
  }
}

const buildBody = (options) => {
  if (options.contentType === 'json') {
    return buildBodyJson(options);
  } else {
    return buildBodyFormData(options);
  }
};

const buildBodyJson = function (options) {
  let params = options.params || {}
  return JSON.stringify(params);
};

const buildBodyFormData = (options) => {
  const body = [];
  for (const key in options.params) {
    if (Object.prototype.hasOwnProperty.call(options.params, key)) {
      if (options.params[key] || options.params[key] === 0 || typeof options.params[key] === 'boolean') {
        body.push(
          `${key}=${encodeURIComponent(options.params[key])}`
        );
      } else {
        body.push(`${key}`);
      }
    }
  }
  return body.join('&');
};

const buildQuery = (options) => {
  let query = '';
  if (options.params) {
    Object.keys(options.params).sort().forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(options.params, key)) {
        const pe = () => {
          return query ? '&' : '?';
        };
        if (options.params[key] || options.params[key] === 0 || typeof options.params[key] === 'boolean') {
          query += `${pe()}${key}=${encodeURIComponent(options.params[key])}`;
        } else if (options.transferEmptyKey) {
          query += `${pe()}${key}`;
        }
      }
    });
  }

  return query;
};

const realRequest = (resolve, reject, url, options) => {
  fetch(url, options).then((res) => {
    console.info('response result ==> ', res); // eslint-disable-line no-console
    var settings = global.azaleaWebRequestSettings;
    if (typeof settings.interceptor === 'function') {
      settings.interceptor(res); // 拦截器
    }
    return checkStatus(res);
  }).then(res => res.json()).then((result) => {
    const json = cloneDeep(result);
    console.info('response json ==> ', json); // eslint-disable-line no-console
    if (json && json.code) {
      throw createError(json.code, json, json.message);
    }
    resolve(json.data);
  })
    .catch((error) => {
      if (error instanceof ServerUnreachableError && options.retryTimes < 3) {
        options.retryTimes += 1; // eslint-disable-line no-param-reassign
        options.originOptions.retryTimes = options.retryTimes; // eslint-disable-line
        setTimeout(() => {
          requestPreHandler(
            resolve,
            reject,
            options.originPath,
            options.originOptions
          );
        }, 2000);
      } else if (error instanceof GeneralError) {
        reject(error);
      } else {
        reject(createError(-1, null, error.message));
      }
    });
};

const commonHeaders = (options, requestDate) => { // eslint-disable-line no-unused-vars
  if ( options.contentType === 'json' ) {
    return {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=UTF-8',
    };
  } else {
    return {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
  }
};

const addExtraHeaders = async (options) => {
  if (!options) {
    return undefined;
  }

  const settings = global.azaleaWebRequestSettings;

  if (typeof(settings.extraHeaders) === 'object') {
    return assign({}, settings.extraHeaders, options.headers);
  } else if (typeof(settings.extraHeaders) === 'function') {
    const extraHeaders = await settings.extraHeaders();
    return assign({}, extraHeaders, options.headers);
  }
  return options.headers;
};

const addExtraParams = async (options) => {
  if (!options) {
    return undefined;
  }

  const settings = global.azaleaWebRequestSettings;
  if (typeof(settings.extraParams) === 'object') {
    return assign({}, settings.extraParams, options.params);
  } else if (typeof(settings.extraParams) === 'function') {
    const extraParams = await settings.extraParams();
    return assign({}, extraParams, options.params);
  }
  return options.params;
};

const prepareOptions = async (requestDate, options, preCallbackResult) => {
  const newOptions = options ? cloneDeep(options) : {};
  if (typeof newOptions.params === 'function') {
    newOptions.params = await newOptions.params(preCallbackResult);
  }
  const defaultHeaders = commonHeaders(newOptions, requestDate);

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

  newOptions.retryTimes = (options && options.retryTimes) || 0;
  newOptions.originOptions = cloneDeep(options);

  newOptions.headers = await addExtraHeaders(newOptions);
  newOptions.params = await addExtraParams(newOptions);

  if (!options) {
    return newOptions;
  }

  if (options.avoidExtraHeaders) {
    for (const key in options.avoidExtraHeaders) {
      delete newOptions.headers[options.avoidExtraHeaders[key]];
    }
  }

  if (options.avoidExtraParams) {
    for (const key in options.avoidExtraParams) {
      delete newOptions.params[options.avoidExtraParams[key]];
    }
  }

  return newOptions;
};

const requestHandler = (resolve, reject, path, options, preCallbackResult) => {
  const requestDate = new Date();
  let url = '';
  const settings = global.azaleaWebRequestSettings;
  if (options && typeof(options.hostName) === 'string') {
    url = `${options.hostName}${path}`;
  } else if (options && typeof(options.hostName) === 'function') {
    url = `${options.hostName()}${path}`;
  } else if (typeof(settings.hostName) === 'string') {
    url = `${settings.hostName}${path}`;
  } else if (typeof(settings.hostName) === 'function') {
    url = `${settings.hostName()}${path}`;
  }
  prepareOptions(requestDate, options, preCallbackResult).then((newOptions) => {
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

const requestPreHandler = (resolve, reject, path, options) => {
  if (options && options.preCallback) {
    options.preCallback().then((result) => {
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
  return new Promise((resolve, reject) => {
    requestPreHandler(resolve, reject, path, options);
  });
}

module.exports = {
  configRequest,
  request,
};
