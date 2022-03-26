import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '@/components/Main/Main'
import Index from '@/views/Nav/Index'
import History from '@/views/Nav/History'
// 内容
import Article from '@/components/Main/Article'
import BuildBlog from '@/views/Content/BuildBlog'
import Test from '@/views/Content/Test'
// 错误页面
import ErrorPage from '@/components/Main/ErrorPage'
// 不允许访问路径
import pathArr from './pathArr'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history', // 去除项目地址栏中的 # 号
  // 路由规则
  routes: [
    {
      path: '/',
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
      path: '/article',
      component: Article,
      children: [
        { path: 'buildBlog', component: BuildBlog },
        { path: 'test', component: Test }
      ]
    },
    // 页面未找到处理
    {
      path: '*',
      component: ErrorPage,
      meta: {
        title: '页面没找到'
      }
    }
  ]
})

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 设置页面变化，title 也跟随页面变化
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (pathArr.indexOf(to.path) !== -1) {
    next('/error')
  } else {
    next()
  }
})

export default router
