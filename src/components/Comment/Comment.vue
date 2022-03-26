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
      <span class="remind" v-if="textLength>0">您还可以输入{{ textLength }}个字</span>
      <span class="remind red" v-else>字数已满！</span>
      <div class="submit-box">
        <button class="submit" @click="submitComment">提交</button>
      </div>
    </div>
      <!-- 评论区域 -->
    <div class="comment-area">
      <h3>{{ commentCount }}条评论</h3>
      <!-- 评论楼层区域 -->
      <div class="comment-info" v-for="item in commentList" :key="item.id">
        <img :src="item.avtar" class="comment-avtar" />
        <div class="comment-main">
          <p class="comment-top">
            <span class="commentator">{{ item.nikename }}</span>
            <span class="comment-time">{{ item.time }}</span>
            <span v-if="item.nikename === '得意猪'" class="author">作者</span>
          </p>
          <p class="comment-content">
<pre>{{ item.content }}</pre>
          </p>
          <p class="comment-bottom">
           <span class="like" @click="addAgree(item.id,$event)">
             <i class="fa fa-thumbs-o-up" ></i>
             <span class="comment-agree" >{{ item.agree }}</span>
           </span>
             <span class="comment-replyIcon" @click="showReply(item.id,item.nikename)"> <i class="fa fa-comment-o" ></i>回复</span
            >
          </p>
          <!-- 回复楼层内容区域 -->
              <div class="comment-box reply-box" v-if="toId === item.id  && isReply">
      <textarea
        name=""
        id="reply-text"
       :placeholder="'回复 @'+toName"
      >
      </textarea>
      <div class="submit-box">
        <button class="submit" @click="submitComment(item.area,item.commentor_id)">发送</button>
      </div>
    </div>
          <!-- 回复区域 -->
          <div class="comment-info" v-for="responder in item.replys" :key="responder.id">
          <img :src="responder.avtar" class="comment-avtar  reply-img" />
        <div class="comment-reply">
          <p class="comment-top reply-top">
            <span class="commentator">{{ responder.fromName }}</span >
             <span v-if="responder.fromName === '得意猪'" class="author">作者</span>
            <span v-if="responder.toName && responder.toName!==item.nikename">
              <font class="reply-font">回复@</font>
              <span class="toName" >{{responder.toName}}</span>
              <span v-if="responder.toName === '得意猪'" class="author">作者</span>
            </span>

            <span class="comment-time">{{ responder.time }}</span>

          </p>
          <p class="comment-content">
<pre>{{ responder.content }}</pre>
          </p>
          <p class="comment-bottom">
            <span class="like" @click="addAgree(responder.id,$event)">
              <i class="fa fa-thumbs-o-up" ></i>
              <span class="comment-agree" >{{ responder.agree }}</span>
            </span>
             <span class="comment-replyIcon"  @click="showReply(responder.id,responder.fromName)"> <i class="fa fa-comment-o"></i>回复</span
            >
          </p>
          <!-- 回复内容区域 -->
         <div class="comment-box reply-box" v-if="toId === responder.id && isReply">
      <textarea
        name=""
        id="reply-text"
       :placeholder="'回复 @'+toName"
      >
      </textarea>
      <div class="submit-box">
        <button class="submit" @click="submitComment(responder.area,responder.commentor_id)">发送</button>
      </div>
          </div>
           </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 评论底部 -->
    <footer class="comment-footer">
      <button class="loadMore" @click="getMoreComment" v-if="currentPage <= totalPage && isMore">加载更多...</button>
      <span v-else class="notMore">评论到底啦~~~</span>
    </footer>
  </div>
</template>

<script>
// 导入依赖
import $ from 'jquery'
import { getCommentCount, getCommentAreaCount, getComment, addComment, getAgree, getAgreeStatus, addAgree } from '@/api/articleAPI'
import { findUser } from '@/api/userAPI'

export default {
  props: ['articleId'],
  data() {
    return {
      user: {},
      textLength: 300,
      commentCount: 0,
      areaCount: 1, // 评论楼层默认第一层
      commentList: [],
      currentPage: 1,
      totalPage: 0,
      isMore: false,
      isReply: false, // 是否显示回复内容盒子
      toName: '', // 发送回复人昵称
      toId: '' // 发送回复人ID
    }
  },

  created() {
    // 获取本地存储的匿名ID
    const anonymousId = localStorage.getItem('anonymousId')
    // 如果用户未登录则使用匿名ID
    if (!this.user.username) {
      // 如果匿名ID不存在，则使用0传入后端自动生成一个匿名ID
      if (anonymousId) {
        this.user.username = anonymousId
      } else {
        this.user.username = '0'
      }
    }
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
      // 评论内容失去焦点则隐藏提示还剩多少字
      $('#comment-text').blur(() => {
        $('.remind').hide()
      })
    })
  },
  methods: {
    // 显示评论内容盒子
    showReply(id, name) {
      this.isReply = true
      this.toId = id
      this.toName = name
    },
    // 获取文章评论
    async getComment() {
      const { data: res1 } = await getCommentCount(this.articleId)
      this.commentCount = res1.data
      const { data: res2 } = await getCommentAreaCount(this.articleId)
      this.areaCount = res2.data
      const { data: res3 } = await getComment(this.articleId, this.currentPage)
      this.commentList = res3.data
      this.totalPage = Math.ceil(this.areaCount / 20)
      if (this.areaCount > 20) {
        this.isMore = true
      }

      // 查询用户信息
      const params = new URLSearchParams()
      params.append('username', this.user.username)
      const { data: user } = await findUser(params)

      // 如果用户与评论者或回复者id相同，则用“你”来表示
      this.$nextTick(() => {
        const fromNames = document.querySelectorAll('.commentator')
        const toNames = document.querySelectorAll('.toName')
        for (let i = 0; i < toNames.length; i++) {
          if (user.data[0].nikename === toNames[i].innerText) {
            fromNames[i].innerText = '匿名'
            $(fromNames[i]).addClass('red')
          }
        }
        for (let i = 0; i < fromNames.length; i++) {
          if (user.data[0].nikename === fromNames[i].innerText) {
            fromNames[i].innerText = '匿名'
            $(fromNames[i]).addClass('red')
          }
        }
      })
    },
    // 加载更多评论
    async getMoreComment() {
      this.currentPage++
      if (this.currentPage === this.totalPage) {
        this.isMore = false
      }

      const { data: res } = await getComment(this.articleId, this.currentPage)
      this.commentList = [...this.commentList, ...res.data]
    },
    // 发表评论/发送评论
    async submitComment(area, toId) {
      if ($('#comment-text').val().length > 300) return alert('评论字数不能超过300字')
      const params = new URLSearchParams()
      params.append('article_id', this.articleId)
      params.append('commentor_id', this.user.username)
      // 如果是回复
      if (toId) {
        params.append('area', area)
        params.append('to_id', toId)
        params.append('content', $('#reply-text').val())
        // 回复完后隐藏内容盒子
        this.isReply = false
      } else {
        params.append('area', this.areaCount)
        params.append('to_id', '')
        params.append('content', $('#comment-text').val())
      }
      const { data: res } = await addComment(params)
      if (res.status === 200) {
        this.getComment()
        $('#comment-text')[0].value = ''
      } else {
        alert('评论失败！请刷新页面重试')
      }
      this.getComment()
      alert(res.message)
    },
    // 点赞
    async addAgree(id, e) {
      const params = new URLSearchParams()
      params.append('comment_id', id)
      params.append('agree_id', this.user.username)
      const { data: res } = await addAgree(params)
      // 点赞完后刷新数据
      if (res.status === 200) {
        const { data: res1 } = await getAgree(id)
        // 如果该用户已经给该条评论点过赞则变红
        const { data: res2 } = await getAgreeStatus(id, this.user.username)
        // 点赞数刷新
        if (e.target.getAttribute('class') === 'fa fa-thumbs-o-up') {
          $(e.target).siblings('span')[0].innerText = res1.data[0].agree
          if (res2.data.length !== 0) {
            $(e.target).parent().addClass('red')
          } else {
            $(e.target).parent().removeClass('red')
          }
        } else if (e.target.getAttribute('class') === 'comment-agree') {
          $(e.target)[0].innerText = res1.data[0].agree
          if (res2.data.length !== 0) {
            $(e.target).parent().addClass('red')
          } else {
            $(e.target).parent().removeClass('red')
          }
        } else {
          $(e.target).children('span')[0].innerText = res1.data[0].agree
          if (res2.data.length !== 0) {
            $(e.target).addClass('red')
          } else {
            $(e.target).removeClass('red')
          }
        }
      } else {
        alert('服务器异常，请刷新页面重试！')
      }
    }
  }
}
</script>

<style lang="less">
.red{
  color: rgb(206, 54, 54) !important;
}
.animate(@time) {
  -webkit-transition: @time;
  transition: @time;
}
#comment-container {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
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
    #comment-text,#reply-text {
      -webkit-transition:all 0.3s;
      transition:all 0.3s;
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
  // 评论区域
  .comment-area {
    margin-top: 30px;

    .fa-comment-o{
      position: relative;
      top: -1px;
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
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--black-white);
        transform: scaleY(0.1);
      }
      width: 92%;
      position: relative;
      bottom: 40px;
      left: 50px;
      padding: 20px 0;
      .comment-top {
        .commentator,.toName {
          color: var(--commentator-c);
        }
        .author {
          margin-left: 5px;
          font-size: 13px;
          font-weight: 500;
          padding: 1px 3px;
          color: #fff;
          background-color: var(--author);
        }

        .comment-time {
          vertical-align:2.5px;
          margin-left: 10px;
          color: #666;
          font-size: 12px;
        }
      }
      .comment-content {
        word-break: break-all;
        margin-top: 5px;
        margin-bottom: 5px;
        color: var(--list-fc);
        font-size: 14px;
      }
      .comment-bottom {
      }
      .like,.comment-replyIcon {
        margin-top: 0;
        color: #666;
        cursor: pointer;
        font-size: 15px;
        margin-right: 40px;
        .animate(0.5s);
        i{
          margin-right: 0.3em !important;
          height: 20px !important;
        }
        &:hover {
          color: #88afd6;
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

// 评论回复区域
.comment-reply{
   width: 92%;
      position: relative;
      bottom: 40px;
      left: 50px;
      padding: 20px 0;
      .reply-top{
        font-size: 13px;
        .comment-time{
          vertical-align: 1px !important;
        }
      }
}

.reply-img{
  top: 12px !important;
  width: 20px !important;
  height: 20px !important;
}
.comment-reply{
  left: 30px !important;
}

// 回复内容
.reply-box{
  margin: 20px 0;
  height: 200px !important;
  textarea{
    margin-bottom: 10px;
  }
  .submit-box{
   position: relative;
   top: -28px;
   .submit{
   top: 5px !important;
   }
  }

}
 .reply-font{
    color: var(--black-white);
    margin-left: 10px;
  }

.comment-footer {
  text-align: center;
  margin: 0 auto;
  .loadMore {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    background-color: transparent;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #666;
    color: #666;
    border-radius: 0.5em;
    font-weight: 600;
    z-index: 999;
    &:hover {
      color: #78ce79;
      border-color: #78ce79;
    }
  }
  .notMore {
    color: #666;
  }
}
textarea::-webkit-input-placeholder {
  color: var(--list-fc);
}
</style>
