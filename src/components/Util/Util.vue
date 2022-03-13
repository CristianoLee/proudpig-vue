<template>
  <div>
    <!-- 右侧工具栏 -->
    <div class="tools toolsDown">
      <!-- 搜索待完成 -->
      <div class="search tool">
        <span class="fa fa-search tool-logo"></span>
      </div>
      <!-- 改变肤色 -->
      <div class="change-color tool" @click="toggleColor">
        <span class="fa fa-adjust tool-logo"></span>
      </div>
    </div>

    <!-- 返回顶部 -->
    <div class="backTop tool backTopDown" @click="backTop">
      <span class="fa fa-chevron-up tool-logo"></span>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      color: ''
    }
  },
  created() {
    this.isDark()
  },
  methods: {
    isDark() {
      // 切换肤色
      let color = this.color
      color = localStorage.getItem('color')
      // 进入页面判断肤色
      if (color) {
        this.dark()
      } else {
        this.light()
      }
    },
    // 切换颜色模式
    toggleColor() {
      let isChange = true
      if (isChange) {
        isChange = false
        setTimeout(() => {
          isChange = true
        }, 500)
        if (this.color === 'dark') {
          this.light()
        } else {
          this.dark()
        }
      }
    },
    // light 是默认模式,默认模式没有 color 这个属性
    light() {
      this.color = 'light'
      document.querySelector('html').removeAttribute('color')
      localStorage.removeItem('color')
    },
    // light 是黑夜模式,设置添加自定义 color 属性为 dark ,并保存到 localStorage 中
    dark() {
      this.color = 'dark'
      document.querySelector('html').setAttribute('color', this.color)
      localStorage.setItem('color', this.color)
    },
    // 点击返回顶部头部导航栏淡出
    backTop() {
      $('html, body').animate({ scrollTop: $('html').offset().top }, 300)
      setTimeout(() => {
        $('.t1').removeClass('scrollDown').addClass('scrollUp')
        $('.backTop').removeClass('backTopUp').addClass('backTopDown')
        $('.tools').removeClass('toolsUp').addClass('toolsDown')
      }, 300)
    }
  }
}
</script>

<style></style>
