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
  modlue: {
    rules: [
      {
        test: /\.less$/,
        // loader有执行顺序，从下到上，从右到左
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 2
            // modules: true // 模块化打包
          }
        }, {
          loader: 'less-loader'
        }, {
          loader: 'postcss-loader'
        }
        ]
      },
      {
        test: /\.css$/,
        // loader有执行顺序，从下到上，从右到左
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
module.exports = merge(commonConfig, devConfig)