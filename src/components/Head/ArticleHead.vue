<template>
  <div class="content">
    <h1>文章头部信息</h1>
  </div>
</template>

<script>
export default {
  name: 'ArticleHead',
  data: function () {
    return {
      headInfo: this.$route.query
    }
  },
  created() {
    // console.log(this.headInfo)
  }
}
</script>

<style></style>
