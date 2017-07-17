/* @flow */
import Index from './Index/Index'
import Home from './Home/Home'
import About from './About/About'
import News from './News/News'
import PostDetail from './PostDetail/PostDetail'
import LienHe from './LienHe/LienHe'
import Recruit from './Recruit/Recruit'
import Course from './Course/Course'
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
        component: News
      }, {
        path: '/tin-tuc/:permalink',
        component: PostDetail
      }, {
        path: '/lien-he',
        component: LienHe
      }, {
        path: '/tuyen-dung',
        component: Recruit
      }, {
        path: '/khoa-hoc',
        component: Course
      }
    ]
  }
]

export default routes
