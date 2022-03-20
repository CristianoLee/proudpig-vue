import axios from 'axios'
const localRequest = axios.create({
  // 指定请求根路径
  baseURL: 'https://data.baobu.top',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

export default localRequest
