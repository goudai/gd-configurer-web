import {request} from "../utils";
import {stringify} from "qs";

/**
 * login
 * @param username
 * @param password
 * @returns {token}
 */
export async function login(username,password) {
    let token = await register('/',{
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: stringify({username: username, password: password})
    })
    localStorage.setItem('token',token)
    return token
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



