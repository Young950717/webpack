const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const devConfig = {
  mode: 'development', // 生产或者开发环境
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    port: 8080,
    hot: true, //热更新
    hotOnly: true,
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}
module.exports = merge(commonConfig, devConfig)