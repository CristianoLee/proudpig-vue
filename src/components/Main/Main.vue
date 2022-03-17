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
              </section>
              <section>
                <div>目录2</div>
              </section>
              <section>
                <div>目录3</div>
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
  // data() {
  //   return {
  //     articleList: [
  //       { id: 1, age: 20 },
  //       { id: 2, age: 20 },
  //       { id: 3, age: 20 },
  //       { id: 4, age: 20 },
  //       { id: 5, age: 20 },
  //       { id: 6, age: 20 },
  //       { id: 7, age: 20 }
  //     ]
  //   }
  // }
}
</script>

<style lang="less" scoped>
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

aside {
  user-select: none;
}
</style>
