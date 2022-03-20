<template>
  <div id="comment-container">
    <div class="comment-box">
      <textarea
        name=""
        id="comment-text"
        placeholder="说点儿什么～
无需登录也没问题！"
      >
      </textarea>
      <span class="remind">您还可以输入{{ textLength }}个字</span>
      <div class="submit-box">
        <button class="submit" @click="submitComment">提交</button>
      </div>
    </div>

    <div class="comment-area">
      <h3>{{ commentCount }}条评论</h3>
      <div class="comment-info" v-for="item in commentList" :key="item.id">
        <img :src="item.avtar" class="comment-avtar" />
        <div class="comment-main">
          <p class="comment-top">
            <span class="commentator">{{ item.commentator }}</span>
            <span class="comment-time">{{ item.time }}</span>
          </p>
          <p class="comment-content">
            {{ item.content }}
          </p>
          <p class="comment-bottom">
            <span class="comment-agree" @click="addAgree"
              ><i class="fa fa-thumbs-o-up"></i>{{ item.agree }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div>
      <button class="loadMore" @click="getMoreComment" v-if="isMore">加载更多</button>
      <span v-if="currentPage >= totalPage" class="notMore">没有更多评论了</span>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { getCommentCount, getComment, addComment } from '@/api/articleAPI'
import dateFormat from '@/assets/js/dateFormat'
export default {
  props: ['articleId'],
  data() {
    return {
      textLength: 300,
      commentCount: 0,
      commentList: [],
      currentPage: 1,
      totalPage: 0,
      isMore: false
    }
  },

  created() {
    // 获取评论
    this.getComment()
    // 处理评论发布
    this.$nextTick(() => {
      $('#comment-text').focus(() => {
        $('.remind').show()
        $('#comment-text').bind('input propertychange', () => {
          setTimeout(() => {
            const text = $('#comment-text').val().length
            if (text <= 300) {
              this.textLength = 300 - text
            } else {
              this.textLength = 0
            }
          }, 500)
        })
      })
      $('#comment-text').blur(() => {
        $('.remind').hide()
      })
    })
  },
  methods: {
    // 获取文章评论
    async getComment() {
      const { data: res1 } = await getCommentCount(this.articleId)
      this.commentCount = res1.data
      const { data: res2 } = await getComment(this.articleId, this.currentPage)
      this.commentList = res2.data
      this.totalPage = res1.data / 20
      if (this.commentCount > 20) {
        this.isMore = true
      }
    },
    // 加载更多评论
    async getMoreComment() {
      if (this.currentPage >= this.totalPage - 1) {
        this.isMore = false
      }

      this.currentPage++
      const { data: res } = await getComment(this.articleId, this.currentPage)
      this.commentList = [...this.commentList, ...res.data]
    },
    // 发表评论
    async submitComment() {
      if ($('#comment-text').val().length > 300) return alert('评论字数不能超过300字')
      const params = new URLSearchParams()
      const pig = dateFormat.pig
      const time = pig.dateFormat()
      params.append('articleId', this.articleId)
      params.append('commentator', '匿名')
      params.append('content', $('#comment-text').val())
      params.append('time', time)
      const { data: res } = await addComment(params)
      if (res.status === 200) {
        this.getComment()
        $('#comment-text')[0].value = ''
      }
      this.getComment()
      alert(res.message)
    },
    // 点赞
    addAgree() {
      alert('点赞功能暂未开发！')
    }
  }
}
</script>

<style lang="less">
#comment-container {
  background-color: var(--comment-bg);
  margin-top: 20px;
  padding: 20px;
  .comment-box {
    position: relative;
    height: 320px;
    border: 1px solid #ddd;
    border-radius: 0.75em;
    padding: 10px;
    .remind {
      position: absolute;
      right: 20px;
      bottom: 85px;
      color: var(--black-white);
      display: none;
    }
    #comment-text {
      width: 100%;
      height: 75%;
      border: none;
      outline: none;
      resize: none;
      border-radius: 0.5em;
      font-size: 1.2em;
      background-color: transparent;
      padding: 5px;
      color: var(--black-white);
      &:focus {
        background-color: var(--textarea-bg);
      }
    }
    .submit-box {
      position: relative;
      margin-top: 20px;
      height: 15%;
      border-top: 1px dashed #666;
    }
    .submit {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 5px;
      width: 56px;
      height: 32px;
      border: none;
      outline: none;
      border-radius: 0.5em;
      cursor: pointer;
      background-color: #27ae60;
      color: #fff;
      &:hover {
        background-color: #2ecc71;
      }
    }
  }
  .comment-area {
    margin-top: 30px;
    i {
      margin-right: 0.2em;
      color: #666;
    }
    .comment-info {
      margin-bottom: -50px;
      .comment-avtar {
        position: relative;
        top: 30px;
        margin-right: 20px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .comment-main {
      width: 92%;
      border-top: 1px dashed #000;
      position: relative;
      bottom: 40px;
      left: 50px;
      padding: 20px 0;
      .comment-top {
        span {
          margin-right: 10px;
        }
        .commentator {
          color: #27ae60;
        }
        .comment-time {
          margin-top: 0;
          color: #666;
        }
      }
      .comment-content {
        word-break: break-all;
        margin-bottom: 10px;
        color: var(--list-fc);
      }
      .comment-bottom {
      }
      .comment-agree {
        margin-top: 0;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #27ae60;
        }
        &:active {
          color: skyblue;
        }
      }
    }
    h3 {
      color: var(--list-fc);
      margin-bottom: 20px;
    }
  }
}
.notMore {
  color: #666;
}
textarea::-webkit-input-placeholder {
  color: var(--list-fc);
}
</style>
