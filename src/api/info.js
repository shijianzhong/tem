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
export function getinfocfg(){
    return request({
        url: `/admin/category/list`,
        method: 'get',
    })
}

export function updateinfocfg(requestdata){
    return request({
        url: `/admin/category/save`,
        method: 'get',
        params:requestdata
    })
}
export function deleteinfocfg(id){
    return request({
        url: `/admin/category/delete/${id}`,
        method: 'get',
    })
}
export function childreninfo(id){
    return request({
        url: `/admin/category/subitem/${id}`,
        method: 'get',
    })
}
export function statuslabelinfo(){
    return request({
        url: `/admin/status_label/list`,
        method: 'get',
    })
}
export function savestatuslabelinfo(requestdata){
    return request({
        url: `/admin/status_label/save`,
        method: 'get',
        params:requestdata
    })
}
export function deletestatulabelinfo(id){
    return request({
        url: `/admin/status_label/delete/${id}`,
        method: 'get',
    })
}
/**
 * 获取通用标签列表
 */
export function tagList(){
    return request({
        url: `/admin/tag/list`,
        method: 'get',
    })
}

export function saveTagList(requestdata){
    return request({
        url: `/admin/tag/save`,
        method: 'get',
        params:requestdata
    })
}

export function deleteTagInfo(id){
    return request({
        url: `/admin/tag/delete/${id}`,
        method: 'get',
    })
}
export function getNewsList(){
    return request({
        url: `/admin/news/list`,
        method: 'get',
    })
}