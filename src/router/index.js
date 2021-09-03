import Vue from 'vue'
import Router from 'vue-router'
import OtherPage from '../view/Others/OtherPage'
import NewsPage from '../view/NewsPage/NewsPage'
import NewsDisplay from '../view/NewsPage/NewsDisplay'
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
import Audit from '../view/UserCenter/ApplicationForm'
import DisasterTable from '@/view/UserCenter/DisasterTable'

import SocialMediaPage from '../view/SocialMedia/MainPage'
import DataV from '../view/SocialMedia/DataV'
import Content from '../view/SocialMedia/Content'
import List from '../view/SocialMedia/List'
import Analysis from '../view/SocialMedia/Analysis'
import Trend from '../view/SocialMedia/Trend'
import Map from '../view/SocialMedia/Map'

import mainmap from '../disaster-display/components/mainpage'
import baseLayout from '../disaster-display/components/baseLayout'

import DataUpload from '../view/Upload/DataUpload'
import Weather from '../view/Weather/Weather'
// import { component } from 'vue/types/umd'

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
          path: '/NewsDisplay',
          component: NewsDisplay
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
            },
            {
              path: 'Audit',
              component: Audit
            },
            {
              path: 'DisasterTable',
              component: DisasterTable
            }
          ]
        },
        {
          path: '/Upload',
          component: DataUpload
        },
        {
          path: '/Weather',
          component: Weather
        },
        {
          path: '/recom',
          component: recom,
          children: [
            {
              path: '/mainmap',
              name: 'mainmap',
              component: mainmap
            },
            {
              path: '/DisasterDisplay',
              name: 'baseLayout',
              component: baseLayout
            }
          ]
        },
        {
          path: '/DataV',
          component: DataV
        },
        {
          path: '/SocialMedia',
          component: SocialMediaPage,
          children: [
            {
              path: 'Content',
              component: Content
            },
            {
              path: 'List',
              component: List
            },
            {
              path: 'Trend',
              component: Trend
            },
            {
              path: 'Map',
              component: Map
            },
            {
              path: 'Analysis',
              component: Analysis
            }
          ]
        }
      ]
    }
  ]
})
