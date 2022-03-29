<template>
  <div id="article">
    <div class="content">
      <!-- 标题、作者 -->
      <ArticleHead :articleId="id" v-if="id"></ArticleHead>
      <div class="article-center">
        <!-- 路由占位符，文章内容 -->
        <router-view></router-view>
      </div>
    </div>
    <!-- 评论 -->
    <Comment :articleId="id" v-if="id"></Comment>
  </div>
</template>

<script>
import ArticleHead from '@/components/Head/ArticleHead'
import Comment from '@/components/Comment/Comment'
import bus from '@/eventBus'

export default {
  data() {
    return {
      id: 0
    }
  },
  created() {
    // 组件创建时将id存入session，避免刷新造成无法传值
    const aid = sessionStorage.getItem('id')
    if (aid) {
      this.id = sessionStorage.getItem('id')
    }
    bus.$on('articleInfo', (id) => {
      this.id = id
      sessionStorage.setItem('id', this.id)
    })
  },
  // 组件销毁时清除session
  destroyed() {
    sessionStorage.removeItem('id')
  },
  components: {
    ArticleHead,
    Comment
  }
}
</script>

<style lang="less">
#article {
  background-color: transparent;
  .article-center {
    padding: 0 20px;
  }
}
</style>
