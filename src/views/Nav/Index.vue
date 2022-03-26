<template>
  <div>
    <section
      v-for="(item, i) in articleList"
      :key="item.id"
      :class="'article-container article' + i"
    >
      <div class="article-box">
        <div class="articleCover-box">
          <div>
            <router-link :to="{ path: item.url }">
              <span @click="addPageviews(item)"
                ><img :src="item.cover" alt="图片加载失败" class="article-cover" @click="toMain"
              /></span>
            </router-link>
          </div>
        </div>
        <div class="article-introduce">
          <header>
            <a class="article-type">{{ item.type }}</a>
            <h2 @click="toMain">
              <router-link :to="{ path: item.url }" class="article-title"
                ><span @click="addPageviews(item)">{{ item.title }}</span></router-link
              >
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
          <span class="readArticle" @click="toMain">
            <span @click="addPageviews(item)"
              ><router-link :to="{ path: item.url }"
                >阅读全文<i class="fa fa-chevron-circle-right"></i></router-link
            ></span>
          </span>
        </p>
      </footer>
    </section>
    <div class="page-container unvisible" v-if="totalPage > 1">
      <div class="page-box" @click="changePage(currentPage - 1)" v-if="currentPage !== 1">&lt;</div>
      <div
        :class="'page-box page' + item"
        v-for="item in totalPage"
        :key="item"
        @click="changePage((currentPage = item))"
      >
        {{ item }}
      </div>
      <div class="page-box" @click="changePage(currentPage + 1)" v-if="currentPage !== totalPage">
        &gt;
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleCount, getArticleInfo, addArticlePageviews } from '@/api/articleAPI'
import bus from '@/eventBus'
import $ from 'jquery'
export default {
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
      articleList: []
    }
  },
  created() {
    this.getArticleList(1)
    let flag = false
    window.addEventListener('scroll', () => {
      if (flag) return
      flag = true
      setTimeout(async () => {
        this.load(this.articleList)
        flag = false
      }, 100)
    })
  },
  methods: {
    // 文章懒加载
    load(data) {
      const C = document.documentElement.clientHeight // 获取可视区域高度
      const S = document.documentElement.scrollTop || document.body.scrollTop

      for (let i = 0; i < data.length; i++) {
        this.$nextTick(() => {
          let box = $('.article' + i)[0]
          if (box === undefined) return
          // offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
          let O = box.offsetTop
          while ((box = box.offsetParent)) {
            O += box.offsetTop
          }
          // 当盒子处于可视距离则变大显示
          if (C + S > O) {
            $('.article' + i).attr('size', 'big')
            // 当页面为第一页时，第一页按钮变色
            if (this.currentPage === 1) {
              $('.page1').addClass('currentPage').siblings('.page-box').removeClass('currentPage')
            }
            // 当显示到了最后一个盒子时才会显示分页按钮
            if (i === data.length - 1) {
              $('.page-container').removeClass('unvisible')
            } else {
              $('.page-container').addClass('unvisible')
            }
          }
        })
      }
    },
    // 获取文章列表
    async getArticleList(currentPage) {
      this.currentPage = currentPage
      const { data: res } = await getArticleInfo(this.currentPage)
      this.articleList = res.data
      const { data: res1 } = await getArticleCount()
      this.totalPage = Math.ceil(res1.data / 10)
      this.load(this.articleList)
    },
    // 添加文章访问量,并将数据传输给子组件
    async addPageviews(item) {
      const params = new URLSearchParams()
      params.append('id', item.id)
      const { data: res } = await addArticlePageviews(params)
      if (res.status === 200) {
        bus.$emit('articleInfo', item.id)
      }
    },
    // 翻页
    async changePage(page) {
      this.$nextTick(() => {
        $('.page' + page)
          .addClass('currentPage')
          .siblings('.page-box')
          .removeClass('currentPage')
      })
      if (page > this.totalPage) {
        alert('已经是最后一页了哦！')
      } else if (page < 1) {
        alert('已经是第一页了哦！')
      } else {
        this.getArticleList(page)
        window.scrollTo(0, $('#main-container').offset().top)
      }
    },
    // 定义跳转到主区域动画
    toMain() {
      let time = 300
      if (window.scrollY <= 480) {
        time = 600
      }
      $('html, body').animate({ scrollTop: 439 }, time)
      setTimeout(() => {
        $('.t1').addClass('scrollUp')
        $('.backTop').addClass('backTopUp')
        $('.tools').addClass('toolsUp')
      }, time)
    }
  }
}
</script>

<style lang="less">
.animate(@time) {
  -webkit-transition: @time;
  transition: @time;
}
:root {
  --trans: scale(0.3);
  --op: 0;
  --h: 220px;
}

[size='big'] {
  --trans: scale(1);
  --op: 1;
  --h: auto !important;
}
.article-container {
  .animate(0.8s) !important;
  opacity: var(--op);
  transform: var(--trans);
  height: var(--h);
  min-height: 220px;
}
.article-box {
  width: 100%;
  height: 100%;
  padding: 20px;
  &:hover .article-cover {
    transform: scale(1.3);
  }
  .articleCover-box {
    display: inline-block;
    width: 35%;
    height: auto;
    div {
      border: 1px solid #f3f3f3;
      overflow: hidden;
      width: 240px;
      height: 145px;
      .article-cover {
        background-color: transparent !important;
        .animate(0.8s) !important;
        width: 100%;
        height: 100%;
      }
    }
  }
  .article-introduce {
    padding-left: 20px;
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
        &::after {
          position: absolute;
          right: -4px;
          bottom: 6px;
          content: '';
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 4px solid #51aded;
          border-radius: 1px;
        }
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

.page-container {
  margin-top: 30px;
  height: 50px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  .page-box {
    cursor: pointer;
    color: var(--black-white);
    text-align: center;
    line-height: 36px;
    position: relative;
    top: 7px;
    font-size: 18px;
    width: 36px;
    height: 36px;
    margin: 0 5px;
    background-color: var(--content-bgc);
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    &:hover {
      background-color: #51aded;
    }
  }

  .currentPage {
    background-color: #51aded;
  }
}
</style>
