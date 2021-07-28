import Vue from 'vue'
import Router from 'vue-router'
import OtherPage from '../view/Others/OtherPage'
import NewsPage from '../view/NewsPage/NewsPage'
import MainPage from '../view/MainPage/MainPage'
import ViewIndex from '../view/index'
import SignIn from '../view/Login/SignIn'
import Register from '../view/Login/Register'
// import Tinymce from '../components/Tinymce/index'
// import Tinymce from '../components/tinymce-editor/tinymce-editor'
// import Temp from '../components/temp'
import ArticlePost from '../view/ArticlePost/ArticlePost'
import UserCenter from '../view/UserCenter/UserCenter'
import Profile from '../view/UserCenter/Profile'
import ManagerPassword from '../view/UserCenter/ManagerPassword'
import ForgetPassword from '../view/Login/ForgetPassword'

import SocialMediaPage from '../view/SocialMedia/MainPage'

import mainmap from '../disaster-display/components/mainpage'
import baseLayout from '../disaster-display/components/baseLayout'
Vue.use(Router)

const recom = {
  template: `<router-view></router-view>`
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ViewIndex,
      children: [
        {
          path: '/',
          component: MainPage
        },
        {
          path: '/Tinymce',
          component: ArticlePost
        },
        {
          path: '/News',
          component: NewsPage
        },
        {
          path: '/Others',
          component: OtherPage
        },
        {
          path: '/Login',
          component: SignIn
        },
        {
          path: '/Register',
          component: Register
        },
        {
          path: '/ForgetPassword',
          component: ForgetPassword
        },
        {
          path: '/UserCenter',
          component: UserCenter,
          children: [
            {
              path: 'Profile',
              component: Profile
            },
            {
              path: 'ManagerPassword',
              component: ManagerPassword
            }
          ]
        },
        {
          path: '/recom',
          component: recom,   //引入recom,必不可少
          children: [
            {
              path: '/DisasterDisplay',
              name: 'baseLayout',
              component: baseLayout
            }
          ]
        },
        {
          path: '/SocialMedia',
          component: SocialMediaPage
        }
      ]
    }
  ]
})
