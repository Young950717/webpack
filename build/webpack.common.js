const path = require('path')
const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const htmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除dist的东西
const webpack = require('webpack')
const commonConfig = {
  entry: {
    main: './src/index.js'
  },
  output: {
    // filename: 'bundle.js',
    // publicPath: '',
    // publicPath: 'http://cdn.com/', // 静态资源需要放到cdn上的话 加个公共前缀地址
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        // babel处理es6
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
          // { 新版本不支持了
          //   loader: 'imports-loader?this=>window'
          // }
        ]
      },
      {
        // 处理图片
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 打包后的文件名字和原来一致 placeholder
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 2048 // 限制文件大小
          }
        }
      },
      {
        // 处理inconfont
        test: /\.(eot|svg|ttf|woff)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  performance: false,
  plugins: [
    new htmlwebpackPlugin({
      template: 'src/public/index.html'
    }),
    new CleanWebpackPlugin(),
    // 自动引入
    new webpack.ProvidePlugin({
      $: 'jquery',
      _join: ['lodash', 'join']
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 可选值 async all initial 默认async
      minSize: 30000, // 小于这个size就不分割
      minChunks: 1, // 引用的依赖至少是2个chuck.js才会分割
      maxAsyncRequests: 5, // 同时加载5个请求
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', // 文件名称连接符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 优先级值
          // filename: '[name][.ext]' // 所有包统一到这个文件的名字
        },
        default: {
          // minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  }
}

module.exports = env => {
  // if (env && env.production) {
  //   //线上
  //   return merge(commonConfig, prodConfig)
  // } else {
  //   return merge(commonConfig, devConfig)
  // }
  return env && env.production ? merge(commonConfig, prodConfig) : merge(commonConfig, devConfig)
}