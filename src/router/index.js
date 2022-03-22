import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '@/components/Main/Main'
import Index from '@/views/Nav/Index'
import History from '@/views/Nav/History'
// 内容
import BuildBlog from '@/views/Content/BuildBlog'
import Test from '@/views/Content/Test'

Vue.use(VueRouter)

const router = new VueRouter({
  // 去除项目地址栏中的 # 号
  // mode: 'history',

  // 路由规则
  routes: [
    { path: '/', redirect: 'index' },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/history',
      component: History
    },
    {
      path: '/buildblog',
      component: BuildBlog
    },
    {
      path: '/test',
      component: Test
    }
  ]
})

export default router
