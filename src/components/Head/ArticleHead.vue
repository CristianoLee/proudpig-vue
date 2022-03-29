<template>
  <div id="article-Head">
    <div class="articleInfo">
      <h1>{{ articleInfo.title }}</h1>
      <p>
        <span><i class="fa fa-calendar"></i>{{ articleInfo.pubtime }}</span>
        <span><i class="fa fa-user"></i>作者&nbsp;{{ articleInfo.nikename }}</span>
        <span>{{ articleInfo.pageviews }}次阅读</span>
        <span><i class="fa fa-commenting-o"></i>{{ articleInfo.pagecomments }}条评论</span>
      </p>
      <hr />
    </div>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/articleAPI'
export default {
  name: 'ArticleHead',
  props: ['articleId'],
  data() {
    return {
      articleInfo: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { data: res } = await getArticleInfo(this.articleId)
      this.articleInfo = res.data[0]
    }
  }
}
</script>

<style lang="less">
#article-Head {
  text-align: center;
  hr {
    margin: 20px auto;
    border: 0;
    border-top: 1px solid #eee;
  }
  .articleInfo {
    padding: 10px;
    h1 {
      font-size: 30px;
      line-height: 2.4;
      color: var(--black-white);
    }
    p {
      span {
        font-size: 14px;
        margin: 0 10px;
      }
    }
  }
}
</style>
