const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const prodConfig = {
  mode: 'development', // 生产或者开发环境
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new optimizeCssAssetsWebpackPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ],
  output: {
    filename: '[name].[contenthash].js', // 使用占位符
    chunkFilename: '[name].[contenthash].js',
  }
}
module.exports = merge(commonConfig, prodConfig)