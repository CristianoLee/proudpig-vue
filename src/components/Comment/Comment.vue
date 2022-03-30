<template>
  <div id="comment-container" class="content">
    <div class="comment-box">
     <div class="comment-warp">
        <textarea
        name=""
        id="comment-text"
        placeholder="说点儿什么～
无需登录也没问题！"
      >
      </textarea>
      <span class="remind" v-if="textLength>0">您还可以输入{{ textLength }}个字</span>
      <span class="remind red" v-else>字数已满！</span>
     </div>
    <div class="submit-box">
      <button class="submit" @click="submitComment">提交</button>
    </div>
    </div>
      <!-- 评论区域 -->
    <div class="comment-area">
      <h3 v-if="commentCount>0">{{ commentCount }}条评论</h3>
      <h3 v-else>暂无评论</h3>
      <!-- 评论楼层区域 -->
      <div class="comment-info" v-for="item in commentList" :key="item.id" :data-id="item.id">
        <img :src="item.avtar" class="comment-avtar" />
        <div class="comment-main">
          <p class="comment-top">
            <span class="commentator">{{ item.nikename }}</span>
            <span v-if="item.nikename === '得意猪'" class="author">作者</span>
          </p>
          <p class="comment-content">
<pre>{{ item.content }}</pre>
          </p>
          <p class="comment-bottom">
            <span class="comment-time">{{ item.time }}</span>
             <span class="comment-replyIcon" @click="showReply(item.id,item.nikename)">
               <i class="fa fa-comment-o" ></i>回复
            </span>
           <span class="like" @click="addAgree(item.id)">
             <i class="fa fa-thumbs-o-up" ></i>
             <span class="comment-agree">{{ item.agree }}</span>
           </span>
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
        <button class="submit" @click="submitComment(item.area,item.commentor_id,0)">发送</button>
      </div>
    </div>
          <!-- 回复区域 -->
          <div class="comment-info" v-for="responder in item.replys" :key="responder.id" :data-id="responder.id">
          <img :src="responder.avtar" class="comment-avtar  reply-img" />
        <div class="comment-reply">
          <p class="comment-top reply-top">
            <span class="commentator">{{ responder.fromName }}</span >
             <span v-if="responder.fromName === '得意猪'" class="author">作者</span>
             <span v-if="responder.fromName === item.nikename && responder.fromName!==user.nikename" class="landlord">楼主</span>
            <span v-if="responder.toName && responder.type===1">
              <font class="reply-font">回复@</font>
              <span class="toName" >{{responder.toName}}</span>
              <span v-if="responder.toName === '得意猪'" class="author">作者</span>
              <span v-if="responder.toName === item.nikename" class="landlord">楼主</span>
            </span>
          </p>
          <p class="comment-content">
<pre>{{ responder.content }}</pre>
          </p>
          <p class="comment-bottom">
            <span class="comment-time">{{ responder.time }}</span>
             <span class="comment-replyIcon" v-if="responder.commentor_id!==user.username" @click="showReply(responder.id,responder.fromName)">
               <i class="fa fa-comment-o"></i>回复
               </span>
            <span class="like" @click="addAgree(responder.id)">
              <i class="fa fa-thumbs-o-up" ></i>
              <span class="comment-agree" >{{ responder.agree }}</span>
            </span>
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
        <button class="submit" @click="submitComment(responder.area,responder.commentor_id,1)">发送</button>
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
      <span v-if="commentCount>0&&currentPage >= totalPage" class="notMore">评论到底啦~~~</span>
    </footer>
  </div>
</template>

<script>
// 导入依赖
import $ from 'jquery'
import { creatAnonymous, getCommentCount, getCommentAreaCount, getComment, addComment, getAgree, initAgreeStatus, getAgreeStatus, addAgree } from '@/api/articleAPI'
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
      toId: '', // 发送回复人ID
      liked: [] // 用户点赞过的评论id集合
    }
  },

  created() {
    // 如果用户未登录，创建匿名用户
    this.createAnonymous()
    // 获取评论
    this.getComment()
    // 查询用户点赞过的评论id
    this.initAgreeStatus()
  },
  mounted() {
    // 处理评论发布
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
  },
  updated() {
    // 如果该用户已经给该条评论点过赞则变红
    for (let i = 0; i < this.liked.length; i++) {
      const id = this.liked[i].id
      $('[data-id=' + id + ']').find('.like').eq(0).addClass('liked')
    }
  },
  methods: {
    // 显示评论内容盒子
    showReply(id, name) {
      this.isReply = true
      this.toId = id
      this.toName = name
    },
    // 查询用户点赞过的评论id
    async initAgreeStatus() {
      const { data: res } = await initAgreeStatus(this.user.username)
      this.liked = res.data
    },
    // 创建匿名用户
    async createAnonymous() {
      // 获取本地存储的匿名ID
      const anonymousId = localStorage.getItem('anonymousId')
      // 如果用户未登录则使用匿名ID
      if (!this.user.username) {
        this.user.username = anonymousId
      }

      // 如果没有匿名ID则重新刷新生成id
      if (!anonymousId) {
        const { data: res } = await creatAnonymous()
        if (typeof res.data === 'string') {
          // 将匿名用户ID存入local
          localStorage.setItem('anonymousId', res.data)
        }
      }
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
      this.user = user.data[0]
      if (user.status === 200) {
        // 如果用户与评论者或回复者id相同，则用“你”来表示
        this.$nextTick(() => {
          const fromNames = document.querySelectorAll('.commentator')
          const toNames = document.querySelectorAll('.toName')
          for (let i = 0; i < toNames.length; i++) {
            if (user.data[0].nikename === toNames[i].innerText) {
              toNames[i].innerText = '匿名(你)'
              $(toNames[i]).addClass('red')
            }
          }
          for (let i = 0; i < fromNames.length; i++) {
            if (user.data[0].nikename === fromNames[i].innerText) {
              fromNames[i].innerText = '匿名(你)'
              $(fromNames[i]).addClass('red')
            }
          }
        })
      }
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
    async submitComment(area, toId, type) {
      const params = new URLSearchParams()

      params.append('article_id', this.articleId)
      params.append('commentor_id', this.user.username)
      // 如果是回复
      if (toId) {
        if ($('#reply-text').val().length > 300) return alert('回复字数不能超过300字')
        if ($('#reply-text').val().trim().length < 1) return alert('回复内容不能为空！')
        params.append('area', area)
        params.append('to_id', toId)
        params.append('content', $('#reply-text').val())
        // 回复完后隐藏内容盒子
        this.isReply = false
      } else {
        if ($('#comment-text').val().length > 300) return alert('评论字数不能超过300字')
        if ($('#comment-text').val().trim().length < 1) return alert('评论内容不能为空！')
        params.append('area', this.areaCount)
        params.append('to_id', '')
        params.append('content', $('#comment-text').val())
      }
      if (type) {
        params.append('type', type)
      } else {
        params.append('type', 0)
      }
      const { data: res } = await addComment(params)
      if (res.status === 200) {
        $('#comment-text')[0].value = ''
        alert(res.message)
      } else {
        const { data: res } = await creatAnonymous()
        if (typeof res.data === 'string') {
          // 将匿名用户ID存入local
          localStorage.setItem('anonymousId', res.data)
        }
        alert('评论失败，请刷新重试！')
      }
      this.getComment()
    },
    // 点赞
    async addAgree(id) {
      const params = new URLSearchParams()
      params.append('comment_id', id)
      params.append('agree_id', this.user.username)
      const { data: res } = await addAgree(params)
      // 点赞完后刷新数据
      if (res.status === 200) {
        // 更新点赞数
        const { data: res1 } = await getAgree(id)
        $('[data-id=' + id + ']').find('.comment-agree').eq(0)[0].innerText = res1.data[0].agree
        // 更新点赞状态
        const { data: res2 } = await getAgreeStatus(id, this.user.username)
        if (res2.data.length !== 0) {
          $('[data-id=' + id + ']').find('.like').eq(0).addClass('liked')
        } else {
          $('[data-id=' + id + ']').find('.like').eq(0).removeClass('liked')
        }
      } else {
        alert('服务器异常，请刷新页面重试！')
      }
    }
  }
}
</script>

<style lang="less">
// 点赞后
.liked{
  color: rgb(206, 54, 54) !important;
}

// 匿名颜色
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
  margin-top: 50px;
  padding: 20px;
  .comment-box {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 0.75em;
    padding: 10px;
    padding-bottom: 0;
    .comment-warp{
      .remind {
            position:relative;
            float: right;
            right: 1em;
            bottom: 3em;
            color: var(--black-white);
            display: none;
          }
    }

    #comment-text,#reply-text {
      -webkit-transition:all 0.3s;
      transition:all 0.3s;
      width: 100%;
      height: 16em;
      min-height:10em;
      max-height: 16em;
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
    #reply-text{
      height: 9em;
      min-height:4em;
    }
    .submit-box {
      position: relative;
      height: 3em;
      max-height: 3em;
      border-top: 1px dashed #666;
    }
    .submit {
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
        .landlord{
          margin-left: 5px;
          font-size: 12px;
          font-weight: 550;
          padding: 1px 3px;
          color: #000;
          background-color: rgb(236, 165, 0)
        }
        .comment-time {
          vertical-align:2px;
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
      .comment-bottom{
        span {
          box-sizing: border-box;
          margin-top: 0;
          color: #666;
          font-size: 15px;
          margin-right: 20px;
          .animate(0.5s);
          i{
            margin-right: 0.3em !important;
            height: 20px !important;
          }
        }
        .like,.comment-replyIcon{
          cursor: pointer;
          .comment-agree{
            margin-right: 0;
          }
          &:hover {
            color: #88afd6;
          }
          &:active {
            color: skyblue;
          }
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
  height: 13em;
  .submit-box{
   position: relative;
   height: 3em;
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
