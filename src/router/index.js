import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },


  {
    path: '/vipmanagement',
    component: Layout,
    redirect: '/vipmanagement/viplevel',
    name: 'VipManagement',
    meta: { title: '会员等级', icon: 'table' },
    children: [
      {
        path: 'viplevel',
        name: 'VipLevel',
        component: () => import('@/views/vip/viplevel'),
        meta: { title: '等级列表', icon: 'table' }
      },
      {
        path: 'addlevel',
        name: 'AddLevel',
        component: () => import('@/views/vip/addlevel'),
        meta: { title: '添加等级', icon: 'tree' }
      },
      {
        path: 'viprule',
        name: 'VipRule',
        component: () => import('@/views/vip/integral'),
        meta: { title: '积分规则设置', icon: 'tree' }
      },

   
    ]
  },
  {
    path: '/vipmanagement',
    component: Layout,
    redirect: '/vipmanagement/viplevel',
    name: 'VipManagement',
    meta: { title: '会员管理', icon: 'table' },
    children: [
      {
        path: 'vipm',
        name: 'Vipm',
        component: () => import('@/views/table/index'),
        meta: { title: '会员管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/infomanagement',
    component: Layout,
    redirect: '/infomanagement/infoclasscfg',
    name: 'InfoManagement',
    meta: { title: '信息管理', icon: 'table' },
    children: [
      {
        path: 'infoclasscfg',
        name: 'InfoClassCfg',
        component: () => import('@/views/infoclass/infoclasscfg'),
        meta: { title: '信息分类配置', icon: 'table' }
      },
      {
        path: 'statelabel',
        name: 'StateLabel',
        component: () => import('@/views/infoclass/statelabel'),
        meta: { title: '状态标签维护', icon: 'tree' }
      },
      {
        path: 'generallabel',
        name: 'GeneralLabel',
        component: () => import('@/views/infoclass/generallabel'),
        meta: { title: '通用标签维护', icon: 'table' }
      },
      {
        path: 'infopub',
        name: 'InfoPub',
        component: () => import('@/views/infoclass/newspub'),
        meta: { title: '信息发布管理', icon: 'table' }
      },
      {
        path: 'infoofvip',
        name: 'InfoofVip',
        component: () => import('@/views/table/index'),
        meta: { title: '会员录入的信息', icon: 'table' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '广告管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: '系统设置',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

