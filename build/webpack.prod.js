const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const prodConfig = {
  mode: 'development', // 生产或者开发环境
  devtool: 'cheap-module-source-map'
}
module.exports = merge(commonConfig, prodConfig)