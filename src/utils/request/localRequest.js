import axios from 'axios'

const localRequest = axios.create({
  // 指定请求根路径
  baseURL: '/'
})

export default localRequest
