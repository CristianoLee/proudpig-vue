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
export const getCommentCount = (id) => {
  return request.get('/api/comment/count', {
    params: {
      id
    }
  })
}

// 查询文章评论
export const getComment = (id, currentPage) => {
  return request.get('/api/comment', {
    params: {
      id,
      currentPage
    }
  })
}

// 添加文章评论
export const addComment = (data) => {
  return request.post('/api/comment', data)
}
