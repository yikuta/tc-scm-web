import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const setting = {
  path: 'setting',
  component: Layout,
  name: 'Setting',
  meta: { title: '用户管理', icon: 'el-icon-user' },
  auth: '',
  children: [
    {
      path: '/setting/users',
      redirect: '/setting/users/list',
      name: 'UsersManage',
      component: ChildLayout,
      children: [
        {
          path: 'list',
          name: 'UsersList',
          meta: { title: '用户列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/setting/users/list/index')
        }
      ]
    }
  ]
}

export default setting
