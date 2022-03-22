<template>
  <div>
    <!--  :class="'article-container article' + i" -->
    <section
      v-for="(item, i) in articleList"
      :key="item.id"
      :class="'article-container article' + i"
    >
      <div class="article-box" :v-show="isload">
        <div class="articleCover-box">
          <div>
            <router-link :to="{ path: item.url }">
              <span @click="addPageviews(item.id)"
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
                ><span @click="addPageviews(item.id)">{{ item.title }}</span></router-link
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
            <span @click="addPageviews(item.id)"
              ><router-link :to="{ path: item.url }"
                >阅读全文<i class="fa fa-chevron-circle-right"></i></router-link
            ></span>
          </span>
        </p>
      </footer>
    </section>
    <div class="page-container">
      <div class="page-box" @click="changePage(currentPage - 1)" v-if="currentPage !== 1">&lt;</div>
      <div id="page1" class="page-box" @click="changePage((currentPage = 1))">1</div>
      <div id="page2" class="page-box" @click="changePage((currentPage = 2))">2</div>
      <div id="page3" class="page-box" @click="changePage((currentPage = 3))">3</div>
      <div class="page-box" @click="changePage(currentPage + 1)" v-if="currentPage !== 3">&gt;</div>
    </div>
  </div>
</template>

<script>
import { getArticleInfo, addArticlePageviews } from '@/api/articleAPI'
import $ from 'jquery'
export default {
  data() {
    return {
      currentPage: 1,
      articleList: [],
      isload: true
    }
  },
  created() {
    this.getArticleList(1)
    this.$nextTick(() => {
      $('#page1').addClass('currentPage').siblings('.page-box').removeClass('currentPage')
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
          // offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
          let O = box.offsetTop
          while ((box = box.offsetParent)) {
            O += box.offsetTop
          }
          if (C + S > O) {
            $('.article' + i).attr('size', 'big')
          }
        })
      }
    },
    // 获取文章列表
    async getArticleList(currentPage) {
      this.currentPage = currentPage
      const { data: res } = await getArticleInfo(this.currentPage)
      this.articleList = res.data
      this.load(res.data)
      let flag = false
      window.addEventListener('scroll', () => {
        if (flag) return
        flag = true
        setTimeout(async () => {
          const { data: res } = await getArticleInfo(this.currentPage)
          this.articleList = res.data
          this.load(res.data)
          flag = false
        }, 100)
      })
    },
    // 添加文章访问量
    addPageviews(id) {
      const params = new URLSearchParams()
      params.append('id', id)
      addArticlePageviews(params)
      // 刷新文章数据
      this.getArticleList()
    },
    // 翻页
    async changePage(page) {
      this.$nextTick(() => {
        $('#page' + page)
          .addClass('currentPage')
          .siblings('.page-box')
          .removeClass('currentPage')
      })
      if (page > 3) {
        alert('已经是最后一页了哦！')
      } else if (page < 1) {
        alert('已经是第一页了哦！')
      } else {
        this.getArticleList(page)
        window.scrollTo(0, 480)
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
  --trans: scale(0.5);
  --op: 0;
  --show: none;
}

[size='big'] {
  --trans: scale(1);
  --op: 1;
  --show: block;
}
.article-container {
  .animate(0.8s);
  // display: var(--show);
  opacity: var(--op);
  transform: var(--trans);
  height: 220px;
}
.article-box {
  width: 100%;
  height: 100%;
  padding: 20px;
  &:hover .article-cover {
    transform: scale(1.5);
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
        .animate(0.6s) !important;
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
