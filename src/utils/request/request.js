import axios from 'axios'

const localRequest = axios.create({
  // 指定请求根路径
  baseURL: 'http://127.0.0.1:8081'
})

export default localRequest
