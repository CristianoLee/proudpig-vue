<template>
  <div>
    <div class="buildBlog content">
      <h1>测试2</h1>
    </div>
    <Comment :articleId="2"></Comment>
  </div>
</template>

<script>
import Comment from '@/components/Comment/Comment'
export default {
  components: {
    Comment
  }
}
</script>

<style lang="less">
.buildBlog {
  height: 300px;
}
</style>
