<template>
  <div>
    <Head></Head>
    <Main></Main>
    <Util></Util>
    <Footer></Footer>
  </div>
</template>

<script>
import Head from '@/components/Head/Head'
import Main from '@/components/Main/Main'
import Util from '@/components/Util/Util'
import Footer from '@/components/Footer/Footer'
import $ from 'jquery'
import { creatAnonymous } from '@/api/articleAPI'
export default {
  data() {
    return {
      beginHeight: 0
    }
  },
  created() {
    this.creatAnonymous()
    window.onload = () => {
      console.log(
        '页面加载完毕！消耗了 %c' + Math.round(100 * performance.now()) / 100 + ' ms',
        'background:#282c34;color:#51aded;'
      )
    }

    // 重新加载页面
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY <= 339) {
        // 向上滚动
        $('.t1').removeClass('scrollDown').addClass('scrollUp')
        $('.main-list-box').css({ top: '56px' })
      }
    })

    // PC端,仅处理鼠标滚动
    window.addEventListener('wheel', () => {
      this.scrollEvent()
    })
    // 移动端
    window.addEventListener('touchmove', () => {
      this.scrollEvent()
    })
  },
  methods: {
    // 创建匿名用户
    async creatAnonymous() {
      const isExit = localStorage.getItem('anonymousId')
      if (!isExit) {
        const { data: res } = await creatAnonymous()
        if (typeof res.data === 'string') {
          // 将匿名用户ID存入local
          localStorage.setItem('anonymousId', res.data)
        }
      }
    },
    // 封装滚轮移动事件
    scrollEvent() {
      // 记录上一次滚动高度，用于判断滚动方向
      let lastHeight = this.beginHeight
      this.beginHeight = window.scrollY
      if (window.scrollY > 339) {
        $('.tools').removeClass('toolsDown').addClass('toolsUp')
        $('.backTop').removeClass('backTopDown').addClass('backTopUp')
      } else {
        $('.tools').removeClass('toolsUp').addClass('toolsDown')
        $('.backTop').removeClass('backTopUp').addClass('backTopDown')
      }
      if ((lastHeight < window.scrollY) & (window.scrollY > 339)) {
        // 向下滚动
        $('.t1').removeClass('scrollUp').addClass('scrollDown')
        $('.main-list-box').css({ top: '15px' })
      }
      if (lastHeight > window.scrollY) {
        // 向上滚动
        $('.t1').removeClass('scrollDown').addClass('scrollUp')
        $('.main-list-box').css({ top: '56px' })
      }
      // 相等则不做处理
      lastHeight = window.scrollY
    }
  },
  components: {
    Head,
    Main,
    Util,
    Footer
  }
}
</script>

<style></style>
