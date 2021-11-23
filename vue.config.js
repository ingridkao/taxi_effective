const PORT = process.env.VUE_APP_PORT

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/taxi_effective/'
    : '/',
  devServer: {
    port: PORT? PORT: 3000
  }
}
