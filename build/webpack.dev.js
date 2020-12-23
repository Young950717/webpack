const path = require('path')
const webpack = require('webpack')
const devConfig = {
  mode: 'development', // 生产或者开发环境
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    port: 3000,
    hot: true, //热更新
    hotOnly: true,
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: {
      '/': {
        target: 'http://www.dell-lee.com'

      }
    }
  },
  module: {
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
  ],
  output: {
    filename: '[name].js', // 使用占位符
    chunkFilename: '[name].js',
  }
}
module.exports = devConfig