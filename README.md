# webpack系统学习
## tree shaking的配置  
如果是pro环境的话就无需额外的配置了  
dev环境下需要在webpack.config.js文件下添加一个
```javascript
optimization: {
    usedExports: true
}
```
还要在package.json里面配置一个
```"sideEffects": false```

## 代码分割
1. 代码分割和webpack无关
2. 实现有两种方式
* 同步代码 config文件配置  
```javascript
optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
```
* 异步代码 无需配置config文件，会自动分割，会单独打包到一个文件