<template>
  <div class="history content-bgc">
    <h2 class="history-tag">文章档案</h2>
    <div class="history-container">
      <h3>当前共有 2 篇文章</h3>
      <div class="history-content">
        <div class="history-title">
          <h2>2022</h2>
        </div>
        <article class="history-node">
          <p>
            <span class="history-pubtime">03-05</span
            ><span class="historyTitle">得意猪博客创立啦！</span>
          </p>
        </article>
        <article class="history-node">
          <p><span class="history-pubtime">03-17</span><span class="historyTitle">测试</span></p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleCount } from '@/api/articleAPI'
export default {
  data() {
    return {
      count: 0
    }
  },
  created() {
    this.getArticleCount()
  },
  methods: {
    async getArticleCount() {
      const { data: res } = await getArticleCount()
      this.count = res.data
    }
  }
}
</script>

<style lang="less">
.history {
  height: 500px;
  .history-tag {
    width: 100%;
    display: inline-block;
    margin-top: 40px;
    text-align: center;
    border-left: 5px solid #51aded;
  }
}

.history-container {
  padding: 15px 50px;
  h3 {
    margin-bottom: 20px;
    font-size: 1.2em;
  }
  .history-content {
    position: relative;
    height: 300px;
    .history-title {
      position: relative;
      h2 {
        margin-left: 20px;
      }
      &::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 40%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #bbbbbb;
      }
    }
    .history-node {
      position: relative;

      p {
        line-height: 2;
        margin-left: 20px;
        .history-pubtime {
          font-size: 12px;
          color: #00a7e0;
          margin-right: 20px;
        }
        .historyTitle {
          color: var(--list-fc);
        }
      }
      &::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 45%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #bbbbbb;
      }
      &::after {
        content: '';
      }
    }
  }
}
</style>
