<template>
  <div>
    <nav class="menu-mobile">
      <ul>
        <li>
          <router-link to="/"><i class="fa fa-home"></i>首页</router-link>
        </li>
        <li>
          <router-link to="/history"><i class="fa fa-book"></i>档案馆</router-link>
        </li>
        <li>
          <a href="#"><i class="fa fa-paw"></i>支持者</a>
        </li>
        <li>
          <a href="#"><i class="fa fa-trophy"></i>作品</a>
        </li>
        <li>
          <a href="#"><i class="fa fa-paper-plane"></i>联系作者</a>
        </li>
      </ul>
    </nav>
    <!-- 头部 -->
    <div class="head-container">
      <!-- PC端导航栏 -->
      <header id="pc-topnav" class="topnav t1">
        <div class="container">
          <nav class="menu-pc">
            <ul>
              <li @click="toMain()">
                <!-- <a target="_self"><i class="fa fa-home"></i>首页</a> -->
                <router-link to="/"><i class="fa fa-home"></i>首页</router-link>
              </li>
              <li @click="toMain()">
                <!-- <a href="#"><i class="fa fa-book"></i>档案馆</a> -->
                <router-link to="/history"><i class="fa fa-book"></i>档案馆</router-link>
              </li>
              <li @click="toMain()">
                <a href="#" @click="toMain()"><i class="fa fa-paw"></i>支持者</a>
              </li>
              <li @click="toMain()">
                <a href="#"><i class="fa fa-trophy"></i>作品</a>
              </li>
              <li @click="toMain()">
                <a href="#"><i class="fa fa-paper-plane"></i>联系作者</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <!-- 移动端导航栏 -->
      <header id="mobile-topnav" class="topnav">
        <div class="container">
          <div class="mobile-logo">
            <p>得意猪</p>
          </div>
          <div class="nav-icon">
            <a href="javascript:;" class="nav-toggle" @click="toggleNav"
              ><span class="fa fa-navicon"></span
            ></a>
          </div>
        </div>
      </header>
    </div>

    <!-- 头部背景 -->
    <div class="head-bg"></div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      navToggle: true,
      navWidth: -240
    }
  },
  created() {
    $(window).resize(() => {
      const e = $(window)
      if (e.width() > 769) {
        $('.menu-mobile').css({ right: '-240px' })
        this.navToggle = true
        $('.fa-times').removeClass('fa-times').addClass('fa-navicon')
      }
    })
  },
  methods: {
    toggleNav() {
      if (this.navToggle) {
        this.navWidth = 0
        $('.fa-navicon').removeClass('fa-navicon').addClass('fa-times')
      } else {
        this.navWidth = -240
        $('.fa-times').removeClass('fa-times').addClass('fa-navicon')
      }
      this.navToggle = !this.navToggle
      $('.menu-mobile').css({ right: this.navWidth })
    },
    // 定义跳转到主区域动画
    toMain() {
      let time = 300
      if (window.scrollY <= 480) {
        time = 600
      }
      $('html, body').animate({ scrollTop: $('#main-container').offset().top - 41 }, time)
      setTimeout(() => {
        $('.t1').addClass('scrollUp')
        $('.backTop').addClass('backTopUp')
        $('.tools').addClass('toolsUp')
      }, time)
    }
  }
}
</script>

<style></style>
