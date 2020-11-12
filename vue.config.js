const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '供应商管理系统'
        return args
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        '@pages': resolve('src/pages'),
        '@components': resolve('src/components'),
        '@assets': resolve('src/assets')
      }
    }
  },
  devServer: {
    port: 8086,
    open: false,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: '1',
        ws: true, // 支持websocket
        changeOrigin: true
      }
    }
  }
}
