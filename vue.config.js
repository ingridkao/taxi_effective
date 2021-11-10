module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/taxi_effective/'
      : '/',
    devServer: {
        port: 12539
    }
}
