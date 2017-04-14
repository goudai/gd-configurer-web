import {request} from "../utils";
import {stringify} from "qs";

/**
 *
 * @returns {Promise.<[]>} 应用列表
 */
export function apps() {
    return register('/apps', {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    })
}
/**
 * 新增一个应用
 * @param appName
 * @returns {}
 */
export function create(appName) {
    return request('/apps', {
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: stringify({app_name: appName})
    })
}
/**
 * 删除一个应用 级联删除配置属性
 * @param appName
 * @returns {*}
 */
export function remove(appName) {
    return request('/apps', {
        method: 'delete',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: stringify({app_name: appName})
    })
}
/**
 *
 * @param appName
 * @returns {*}
 */
export function  modify(appName, newAppName) {
    return request('/apps', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: stringify({app_name: appName, new_app_name: newAppName})
    })
}
