import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/pages/Layout'
import store from '../store'

import Supplier from './supplier'
import Commodity from './commodity'
import Order from './order'
import Setting from './setting'
import Aftermarket from './aftermarket'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/account/login'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-home'
      }
    }]
  }
]

export const asyncRouterMap = [
  Supplier, // 供应商
  Commodity, // 商品
  Order, // 订单
  Aftermarket,
  Setting
]

export const allRouterMap = [
  ...constantRouterMap,
  ...asyncRouterMap,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRouterMap,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || { x: 0, y: 0 }
  }
})

// 查看是否登录或者有权限
router.beforeEach((to, from, next) => {
  next()
  if (store.state.global.token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
