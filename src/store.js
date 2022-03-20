import Vue from 'vue'
import Vuex from 'vuex'
import { getArticleCount } from '@/api/articleAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleList: {},
    totalCount: 0,
    totalPage: 0
  },
  // 只有 mutations 中定义的函数，才有权利修改 state 中的数据
  mutations: {
    // 获取文章信息列表
    // initArticleList(state, list) {
    //   state.articleList = list
    // }
    // 获取文章总数
    getArticleData(state, data) {
      state.totalCount = data
      state.totalPage = Math.ceil(data / 10)
    }
  },
  // 进行异步操作，没有权限操作 state，但可以通过 context 发送数据给mutations
  actions: {
    // 获取文章信息列表
    // async getArticleList(context) {
    //   const { data: res } = await getArticleInfo()
    //   context.commit('initArticleList', res.data)
    // }
    // context 发送对象，解构赋值简写{commit}
    async getArticleData({ commit }) {
      const { data: res } = await getArticleCount()
      commit('getArticleData', res.data)
    }
  },
  getters: {
    // articleList(state) {
    //   return state.articleList
    // },
    articleCount(state) {
      return state.totalCount
    },
    articlePages(state) {
      return state.totalPage
    }
  },
  modules: {}
})
