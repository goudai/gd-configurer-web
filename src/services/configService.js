import {request} from "../utils";
import {stringify} from "qs";

/**
 *
 * @returns {Promise.<[]>} 应用列表
 */
export function appConfigList(appName) {
    return register(`/configs/${appName}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    })
}
/**
 * 新增一个配置
 * @param appName
 * @returns {}
 */
export function create(appName, key, value) {
    return request('/configs', {
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: stringify({app_name: appName, key: key, value: value})
    })
}
/**
 * 删除一个配置属性
 * @param appName
 * @returns {*}
 */
export function remove(appName,key) {
    return request('/configs', {
        method: 'delete',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: stringify({app_name: appName,key:key})
    })
}
/**
 * 修改一个配置
 * @param appName
 * @param key
 * @param value
 * @returns {*}
 */
export function modify(appName, key,value) {
    return request('/configs', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: stringify({app_name: appName, key: key, value: value})
    })
}
