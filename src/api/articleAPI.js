import request from '@/utils/request/request'

// 查询文章
export const getArticleInfo = function () {
  return request.get('/api/article')
}
