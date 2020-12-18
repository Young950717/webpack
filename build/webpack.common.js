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
    path: path.resolve(__dirname, 'dist')
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
  ]
}