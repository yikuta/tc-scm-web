import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const supplier = {
  path: '/supplier',
  component: Layout,
  name: 'Supplier',
  meta: { title: '供应商管理', icon: 'el-icon-truck' },
  auth: '',
  children: [
    {
      path: '/supplier/manage',
      redirect: '/supplier/manage/list',
      name: 'SupplierManage',
      component: ChildLayout,
      children: [
        {
          path: 'list',
          name: 'SupplierList',
          meta: { title: '供应商列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/supplier/list/index')
        },
        {
          path: 'details',
          hidden: true,
          name: 'SupplierDetails',
          meta: { title: '供应商详情', icon: '', noCache: true },
          component: () => import('@/pages/supplier/list/details')
        }
      ]
    }
  ]
}

export default supplier
