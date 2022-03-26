module.exports = {
  // 设置导出的文件能以 file 请求头打开
  publicPath: './',
  devServer: {
    port: 80
  },
  // 不导出源码，防止搞破坏
  productionSourceMap: false
}
