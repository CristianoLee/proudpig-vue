import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '@/components/Main/Main'
import Index from '@/views/Index/Index'
import History from '@/views/History/History'
Vue.use(VueRouter)

const router = new VueRouter({
  // 去除项目地址栏中的 # 号
  mode: 'history',
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/history',
      component: History
    }
  ]
})

export default router
