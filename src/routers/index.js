/* @flow */
import Login from './Login/Login'
import Index from './Index/Index'
import Home from './Home/Home'
import UserSetting from './UserSetting/UserSetting'
import ResetPassword from './ResetPassword/ResetPassword'

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/user-setting',
        component: UserSetting
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/reset-password/',
    component: ResetPassword
  }
]

export default routes
