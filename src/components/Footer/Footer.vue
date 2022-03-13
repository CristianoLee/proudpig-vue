<template>
  <div>
    <!-- 底部 -->
    <footer class="footer-container">
      <div class="footer-content">
        <ul class="social">
          <li>
            <a href="https://github.com/CristianoLee" target="_blank">
              <span class="fa fa-github"></span>
            </a>
          </li>
        </ul>
        © 2022 得意猪 版权所有. 本站已在风雨中度过<span class="existTime"></span>
      </div>
    </footer>
  </div>
</template>

<script>
import dateFormat from '@/assets/js/dateFormat'
import axios from 'axios'
export default {
  name: 'Footer',
  created() {
    this.buildTime()
  },
  methods: {
    async buildTime() {
      // 计算网站创建至今时长
      // 将时间转化为毫秒值
      const { data: res } = await axios.get('/file/buildTime.json')
      const pig = dateFormat.pig
      const before = pig.toMilliSecond(res.data.replace(/-/g, '/'))
      setInterval(() => {
        const time = pig.timeDifference(before)
        document.querySelector('.existTime').innerText = time
      }, 1e3)
    }
  }
}
</script>

<style></style>
