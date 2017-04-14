import {request} from '../utils'

/**
 * var input = document.querySelector('input[type="file"]')

 var data = new FormData()
 data.append('file', input.files[0])
 data.append('user', 'hubot')

 fetch('/avatars', {
  method: 'POST',
  body: data
})
 * @param propertiesFile
 */
export function properties(propertiesFile) {
    var data = new FormData()
    data.append('file', propertiesFile)
    return request('/files', {
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        },
        body: data
    })
}

