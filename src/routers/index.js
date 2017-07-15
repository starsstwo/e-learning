/* @flow */
import Index from './Index/Index'
import Home from './Home/Home'
import About from './About/About'
import Post from './Post/Post'
import PostDetail from './PostDetail/PostDetail'
import LienHe from './LienHe/LienHe'
import Tuyendung from './Tuyendung/Tuyendung'
import Khoahoc from './Khoahoc/Khoahoc'
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
        path: '/gioi-thieu',
        component: About
      },
      {
        path: '/tin-tuc',
        component: Post
      }, {
        path: '/tin-tuc/:permalink',
        component: PostDetail
      }, {
        path: '/lien-he',
        component: LienHe
      }, {
        path: '/tuyen-dung',
        component: Tuyendung
      }, {
        path: '/khoa-hoc',
        component: Khoahoc
      }
    ]
  }
]

export default routes
