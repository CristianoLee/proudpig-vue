import request from '@/utils/request/request'

// 创建匿名用户
export const creatAnonymous = () => {
  return request.post('/api/private')
}

// 查询文章数量
export const getArticleCount = () => {
  return request.get('/api/article/count')
}

// 根据id查询文章
export const getArticleInfo = (id) => {
  return request.get('/api/articleInfo', {
    params: {
      id
    }
  })
}

// 查询文章集合
export const getArticleList = (data) => {
  return request.get('/api/articleList', {
    params: {
      currentPage: data
    }
  })
}

// 添加文章阅读量
export const addArticlePageviews = (data) => {
  return request.post('/api/article', data)
}

// 查询文章评论量
export const getCommentCount = (articleId) => {
  return request.get('/api/comment/count', {
    params: {
      article_id: articleId
    }
  })
}

// 查询评论楼层数量
export const getCommentAreaCount = (articleId) => {
  return request.get('/api/comment/areaCount', {
    params: {
      article_id: articleId
    }
  })
}

// 查询文章评论
export const getComment = (articleId, currentPage) => {
  return request.get('/api/comment', {
    params: {
      article_id: articleId,
      currentPage
    }
  })
}

// 添加文章评论
export const addComment = (data) => {
  return request.post('/api/comment', data)
}

// 查询/更新点赞数
export const getAgree = (id) => {
  return request.get('/api/comment/agree', {
    params: {
      id
    }
  })
}

// 初始化点赞状态
export const initAgreeStatus = (agreeId) => {
  return request.get('/api/comment/agree/initStatus', {
    params: {
      agree_id: agreeId
    }
  })
}

// 查询/更新点赞状态
export const getAgreeStatus = (commentId, agreeId) => {
  return request.get('/api/comment/agree/status', {
    params: {
      comment_id: commentId,
      agree_id: agreeId
    }
  })
}

// 添加评论点赞
export const addAgree = (data) => {
  return request.post('/api/comment/agree', data)
}
