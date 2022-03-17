<template>
  <div>
    <section v-for="item in articleList" :key="item.id" class="article-container">
      <div class="article-box">
        <div class="articleCover-box">
          <a href=""> <img :src="item.cover" alt="图片加载失败" class="article-cover" /></a>
        </div>
        <div class="article-introduce">
          <header>
            <a class="article-type">{{ item.type }}</a>
            <h2>
              <a href="" class="article-title">{{ item.title }}</a>
            </h2>
          </header>
          <div class="article-introduce-content">
            <p>
              {{ item.introduce }}
            </p>
          </div>
        </div>
      </div>
      <footer class="article-footer">
        <p>
          <span><i class="fa fa-calendar"></i>{{ item.pubtime }}</span>
          <span
            ><i class="fa fa fa-eye"></i><font>{{ item.pageviews }}</font
            >次阅读</span
          >
          <span
            ><i class="fa fa-commenting-o"></i><font>{{ item.pagecomments }}</font
            >条评论</span
          >
          <span class="readArticle"
            ><a href="">阅读全文<i class="fa fa-chevron-circle-right"></i></a
          ></span>
        </p>
      </footer>
    </section>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/articleAPI'
export default {
  data() {
    return {
      articleList: {}
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const { data: res } = await getArticleInfo()
      console.log(res.data)
      this.articleList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.article-box {
  width: 100%;
  height: 100%;
  .articleCover-box {
    padding: 20px;
    display: inline-block;
    width: 35%;
    height: auto;
    .article-cover {
      padding: 2px;
      border: 1px solid #f3f3f3;
      width: 240px;
      height: 145px;
    }
  }
  .article-introduce {
    padding: 20px;
    display: inline-block;
    top: 20px;
    width: 65%;
    height: auto;
    header {
      position: relative;
      top: -3px;
      height: 45px;
      .article-type {
        position: relative;
        top: -2px;
        display: inline-block;
        padding: 4px;
        font-size: 13px;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        background-color: #51aded;
      }
      h2 {
        height: 27px;
        margin-left: 12px;
        display: inline-block;
        line-height: 1;
        .article-title {
          display: inline-block;
          font-size: 20px;
        }
      }
    }
    .article-introduce-content {
      height: 100px;
      overflow: hidden;
      p {
        font-size: 15px;
      }
    }
  }
}
.article-footer {
  i {
    margin-left: 0.3em;
  }
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  font-size: 12px;
  p {
    position: relative;
    height: 34px;
    line-height: 34px;
    height: auto;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
    .readArticle {
      position: absolute;
      height: 34px;
      line-height: 34px;
      right: 0;
    }
  }
}
</style>
