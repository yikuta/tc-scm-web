import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const supplier = {
  path: '/order',
  component: Layout,
  name: 'Order',
  meta: { title: '订单管理', icon: 'el-icon-s-order' },
  auth: '',
  children: [
    {
      path: '/order/issuing',
      redirect: '/order/issuing/list',
      name: 'IssuingManage',
      component: ChildLayout,
      children: [
        {
          path: 'list',
          name: 'IssuingList',
          meta: { title: '代发订单列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/order/issuing/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'IssuingDetails',
          meta: { title: '代发订单详情', icon: '', noCache: true },
          component: () => import('@/pages/order/issuing/details')
        }
      ]
    },
    {
      path: '/order/purchase',
      redirect: '/order/purchase/list',
      name: 'PurchaseManage',
      component: ChildLayout,
      children: [
        {
          path: 'list',
          name: 'PurchaseList',
          meta: { title: '采购订单列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/order/purchase/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'PurchaseDetails',
          meta: { title: '采购订单详情', icon: '', noCache: true },
          component: () => import('@/pages/order/purchase/details')
        }
      ]
    }
  ]
}

export default supplier
