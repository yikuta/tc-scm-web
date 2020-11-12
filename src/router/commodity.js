import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const supplier = {
  path: '/commodity',
  component: Layout,
  name: 'Commodity',
  meta: { title: '商品管理', icon: 'el-icon-orange' },
  auth: '',
  children: [
    {
      path: '/commodity/manage',
      redirect: '/commodity/manage/list',
      name: 'CommodityManage',
      component: ChildLayout,
      children: [
        {
          path: 'list',
          name: 'CommodityList',
          meta: { title: '商品列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/commodity/list/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'CommodityDetails',
          meta: { title: '商品详情', icon: '', noCache: true },
          component: () => import('@/pages/commodity/list/details')
        }
      ]
    }
  ]
}

export default supplier
