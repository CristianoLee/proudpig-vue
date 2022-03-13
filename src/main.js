import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import ball from './assets/js/ball.js'

Vue.config.productionTip = false
// 使用的css
// 使用的js
Vue.use(ball)

new Vue({
  // router,
  render: (h) => h(App)
}).$mount('#app')
