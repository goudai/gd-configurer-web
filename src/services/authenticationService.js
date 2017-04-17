import {request} from "../utils";
import {stringify} from "qs";

/**
 * login
 * @param username
 * @param password
 * @returns {token}
 */
export function login({username, password}) {
  return request('/', {
    method: 'post',
    mode: 'cors',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: stringify({username, password})
  })
}

export function register(username, password, securityCode) {
  return request('/sessions', {
    method: 'post',
    mode: 'cors',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: stringify({username: username, password: password, security_code: securityCode})
  })
}



