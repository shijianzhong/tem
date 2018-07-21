import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getVipLevelList,
  changeUserLevel,
  deleteViplevel,
  getintegral,
  saveintegral
} from '@/api/vip'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  stat
} from 'fs';

const vip = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    viplevellist: [],
  },

  mutations: {

    SET_VIPLEVEL_LIST: (state, value) => {
      state.viplevellist = value;
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {

    saveintegral({
      commit
    }, value) {
      return new Promise((resolve, reject) => {
        saveintegral(value).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })

    },
    getintegral({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getintegral().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteViplevel({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        deleteViplevel(id).then(response => {

          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    changeUserLevel({
      commit
    }, requestdata) {
      return new Promise((resolve, reject) => {
        changeUserLevel(requestdata).then(response => {

          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    getVipLevelList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getVipLevelList().then(response => {
          const data = response.data
          commit('SET_VIPLEVEL_LIST', data)
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({
      commit
    }, userInfo) {
      debugger
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default vip
