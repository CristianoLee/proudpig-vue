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
                    <span class="list-meta-count">xx</span>
                  </div>
                  <div class="list-meta-content">
                    <span class="list-meta-name">分类</span>
                    <span class="list-meta-count">xx</span>
                  </div>
                  <div class="list-meta-content">
                    <span class="list-meta-name">标签</span>
                    <span class="list-meta-count">xx</span>
                  </div>
                </div>
              </section>
              <section>
                <h4 class="Categories"><i class="fa fa-folder"></i> 分类目录</h4>
                <div></div>
              </section>
              <section>
                <h4 class="Categories"><i class="fa fa-tags"></i> 聚合标签</h4>
                <div></div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
    span {
      color: var(--list-fc);
      text-align: center;
      display: block;
    }
  }
}

aside {
  user-select: none;
}
</style>
