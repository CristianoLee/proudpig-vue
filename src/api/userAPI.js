import request from '@/utils/request/request'

// 查询用户信息
export const findUser = (data) => {
  return request.post('/api/user', data)
}
