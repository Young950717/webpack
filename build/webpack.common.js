const path = require('path')
const htmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除dist的东西
module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].js', // 使用占位符
    publicPath: './',
    // publicPath: 'http://cdn.com/', // 静态资源需要放到cdn上的话 加个公共前缀地址
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        // babel处理es6
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
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
      },
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
    new htmlwebpackPlugin({
      template: 'src/public/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // 可选值 async all initial 默认async
      minSize: 30000, // 小于这个size就不分割
      minChunks: 2, // 引用的依赖至少是2个chuck.js才会分割
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