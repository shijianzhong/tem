import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getVipLevelList(){
    return request({
        url: '/admin/user_level/list',
        method: 'get'
    })
}

export function changeUserLevel(requestdata){
    
    return request({
        url: '/admin/user_level/save',
        method: 'get',
        params:requestdata
    })
}
export function deleteViplevel(id){
    return request({
        url: `/admin/user_level/delete/${id}`,
        method: 'get',
    })
}
export function  getintegral(){
    return request({
        url: `/admin/integral_rule/list`,
        method: 'get',
    })
}
export function saveintegral(value){
    return request({
        url: `/admin/integral_rule/save`,
        method: 'get',
        params:{
            items:value
        }
    })
}
