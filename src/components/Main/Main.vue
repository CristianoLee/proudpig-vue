<template>
  <div>
    <div id="main-container">
      <div class="container">
        <div id="main">
          <!-- 内容区域 -->
          <article class="main-content md">
            <!-- <section v-for="item in articleList" :key="item.id">
              <div>文章{{ item.id }}</div>
            </section> -->
            <router-view></router-view>
          </article>
          <!-- 目录区域 -->
          <aside class="main-list md">
            <div class="main-list-box">
              <section class="pigInfo">
                <div class="asideBg"></div>
                <div class="pigIcon"></div>
                <div class="introduce">
                  <div>这里是得意猪的博客</div>
                  <div>欢迎来到本蹄儿的世界</div>
                </div>
                <div class="list-meta">
                  <div class="list-meta-content">
                    <span class="list-meta-name">文章</span>
                    <span class="list-meta-count">{{ $store.getters.articleCount }}</span>
                  </div>
                  <div class="list-meta-content">
                    <span class="list-meta-name">分类</span>
                    <span class="list-meta-count">3</span>
                  </div>
                  <div class="list-meta-content">
                    <span class="list-meta-name">标签</span>
                    <span class="list-meta-count">4</span>
                  </div>
                </div>
              </section>
              <section>
                <h4 class="Categories"><i class="fa fa-folder"></i> 分类目录</h4>
                <div class="Categories-list">
                  <ul>
                    <li><span>重大事件</span></li>
                    <li><span>评论专栏</span></li>
                    <li><span>测试</span></li>
                  </ul>
                </div>
              </section>
              <section>
                <h4 class="Categories"><i class="fa fa-tags"></i> 聚合标签</h4>
                <div class="tags-list">
                  <span>js</span>
                  <span>node</span>
                  <span>mysql</span>
                  <span>git</span>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getArticleData')
  }
}
</script>

<style lang="less">
.asideBg {
  height: 120px;
  background: url(/image/asideBg.jpg);
}
.pigIcon {
  width: 90px;
  height: 90px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  position: relative;
  top: -45px;
  margin: 0 auto;
  background: url(/image/smallPig.jpg) 0 0 / cover;
}

.list-meta {
  position: relative;
  height: 80px;
  bottom: 30px;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  .list-meta-content {
    width: 68px;
    height: 80px;
    margin: 0 24px;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    padding-top: 10px;
    &:hover {
      background-color: var(--meta-bg);
    }
    &:hover span {
      color: #618eba;
    }
    span {
      color: var(--list-fc);
      text-align: center;
      display: block;
    }
  }
}

.Categories {
  position: relative;
  top: 20px;
  margin: 0 auto;
  width: 88%;
  border-bottom: 1px solid #e7e7e7;
  line-height: 2.4;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 35%;
    height: 2px;
    background-color: #51aded;
  }
}

// 分类目录
.Categories-list {
  width: 85%;
  margin: 0 auto;
  margin-top: 30px;
  li {
    display: block;
    line-height: 2;
    padding: 0 5px;
    &::before {
      font-family: fontawesome;
      content: '\f114';
      font-size: 15px;
      margin-right: 10px;
    }
    span {
    }
  }
}

// 聚合标签
.tags-list {
  margin-top: 15px;
  padding: 20px 30px;
  span {
    cursor: pointer;
    .animate(0.5s);
    display: inline-block;
    border: 1px solid #ccc;
    padding: 2px 12px;
    margin-right: 15px;
    border-radius: 5px;
    &:hover {
      color: var(--font-hover);
      background-color: var(--list-fc);
    }
  }
}

aside {
  user-select: none;
}

.animate(@time) {
  -webkit-transition: @time;
  transition: @time;
}
</style>
