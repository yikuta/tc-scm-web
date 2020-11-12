import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const aftermarket = {
  path: '/aftermarket',
  component: Layout,
  name: 'Aftermarket',
  meta: { title: '售后管理', icon: 'el-icon-truck' },
  auth: '',
  children: [
    {
      path: '/aftermarket/returns',
      redirect: '/aftermarket/returns/index',
      name: 'ReturnsManage',
      component: ChildLayout,
      children: [
        {
          path: 'index',
          name: 'ReturnsList',
          meta: { title: '退货退款列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/aftermarket/returns/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'ReturnsDetails',
          meta: { title: '售后详情', icon: '', noCache: true },
          component: () => import('@/pages/aftermarket/returns/details')
        }
      ]
    },
    {
      path: '/aftermarket/exchange',
      redirect: '/aftermarket/exchange/index',
      name: 'ExchangeManage',
      component: ChildLayout,
      children: [
        {
          path: 'index',
          name: 'ExchangeList',
          meta: { title: '换货列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/aftermarket/exchange/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'ExchangeDetails',
          meta: { title: '售后详情', icon: '', noCache: true },
          component: () => import('@/pages/aftermarket/exchange/details')
        }
      ]
    },
    {
      path: '/aftermarket/reissue',
      redirect: '/aftermarket/reissue/index',
      name: 'ReissueManage',
      component: ChildLayout,
      children: [
        {
          path: 'index',
          name: 'ReissueList',
          meta: { title: '补发列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/aftermarket/reissue/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'ReissueDetails',
          meta: { title: '售后详情', icon: '', noCache: true },
          component: () => import('@/pages/aftermarket/reissue/details')
        }
      ]
    }
  ]
}

export default aftermarket
