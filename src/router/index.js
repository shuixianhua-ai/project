import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import mainmap from '../components/mainpage'
import baseLayout from '../components/baseLayout'

Vue.use(Router)

//引入recom组件
const recom = {
  template: `<router-view></router-view>`
}

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/recom',
    component: recom,   //引入recom,必不可少
    children: [
      {
        path: '/mainmap',
        name: 'mainmap',
        component: mainmap
      },
      {
        path: '/baseLayout',
        name: 'baseLayout',
        component: baseLayout
      }]
  }]
})
