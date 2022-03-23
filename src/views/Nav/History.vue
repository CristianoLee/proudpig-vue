<template>
  <div class="history content">
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
          <p>
            <span class="history-pubtime">03-17</span><span class="historyTitle">来这里留言</span>
          </p>
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
        left: -7px;
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
        line-height: 3;
        margin-left: 20px;
        .history-pubtime {
          font-size: 12px;
          color: #00a7e0;
          margin-right: 20px;
        }
        .historyTitle {
          -webkit-transition: all 0.5s;
          cursor: pointer;
          transition: all 0.5s;
          color: var(--list-fc);
          &:hover {
            color: #6ec3f6;
          }
        }
      }
      &::before {
        box-sizing: border-box;
        content: '';
        position: absolute;
        left: -5px;
        top: 45%;
        width: 6px;
        height: 6px;
        border: 1px solid #fff;
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
