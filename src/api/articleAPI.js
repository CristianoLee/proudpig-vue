import request from '@/utils/request/request'

// 查询文章数量
export const getArticleCount = () => {
  return request.get('/api/article/count')
}

// 查询文章
export const getArticleInfo = (data) => {
  return request.get('/api/article', {
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

// 添加评论点赞
export const addAgree = (data) => {
  return request.post('/api/comment/agree', data)
}
