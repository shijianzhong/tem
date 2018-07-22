import {
  getinfocfg,
  updateinfocfg,
  deleteinfocfg,
  childreninfo,
  statuslabelinfo,
  savestatuslabelinfo,
  deletestatulabelinfo,
  tagList,
  saveTagList,
  deleteTagInfo,
  getNewsList,
  getCascaderData,
  getStatusLabelData,
  getTagsListData,
  getVipLevelData,
  getNamesListData,
  saveNews,
} from '@/api/info'
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



    saveNews({
      commit
    }, postdata) {
      return new Promise((resolve, reject) => {
        getNamesListData(postdata).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    getNamesListData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getNamesListData().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    getVipLevelData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getVipLevelData().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTagsListData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getTagsListData().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    getStatusLabelData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getStatusLabelData().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCascaderData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getCascaderData().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    getNewsList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getNewsList().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 根据id删除通用标签
     * @param {*} param0 
     * @param {*} id   -----标签ID
     */
    deleteTagInfo({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        deleteTagInfo(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 修改通用标签
     * @param {*} param0 
     * @param {*} requestdata 
     */
    saveTagList({
      commit
    }, requestdata) {
      return new Promise((resolve, reject) => {
        saveTagList(requestdata).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     *获取标签列表
     */
    tagList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        tagList().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    deletestatulabelinfo({
      commit
    }, id) {

      return new Promise((resolve, reject) => {
        deletestatulabelinfo(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    savestatuslabelinfo({
      commit
    }, requestdata) {
      return new Promise((resolve, reject) => {
        savestatuslabelinfo(requestdata).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    statuslabelinfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        statuslabelinfo().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    childreninfo({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        childreninfo(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteinfocfg({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        deleteinfocfg(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateinfocfg({
      commit
    }, requestdata) {
      return new Promise((resolve, reject) => {
        updateinfocfg(requestdata).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    getinfocategory({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getinfocfg().then(response => {
          resolve(response);
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
