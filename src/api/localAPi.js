import localRequest from '@/utils/request/localRequest'

// 向外按需导出一个 API 函数
export const getBuildTime = function () {
  // 发起 GET 请求，获取文章列表数据
  return localRequest.get('/file/buildTime.json')
}
