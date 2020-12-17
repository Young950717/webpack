const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware') //中间件
const config = require('./webpack.config.js')
const compliter = webpack(config) // 编译 打包
const app = express()

app.use(webpackDevMiddleware(compliter, {
    publicPath: config.output.publicPath
}))

app.listen(8080, () => {
    console.log('server is runing')
})