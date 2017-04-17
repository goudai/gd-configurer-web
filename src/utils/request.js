import fetch from 'dva/fetch';
import config from './config.js';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  console.log(response.status)

  const error = new Error(response.status);
  error.response = response;

  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(
    config.apiGateway + url,
    {
      ...options
    }
  );
  checkStatus(response);
  const result = await response.json();
  if (result.code === 401) {
    throw new Error(401)
  }
  return result;
}
