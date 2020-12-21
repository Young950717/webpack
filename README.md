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
      chunks: 'initial'
    }
  }
```
* 异步代码 
```javascript
optimization: {
    splitChunks: {
      chunks: 'async'
    }
  }
```
另外可以在业务代码中使用魔法注释让打包的文件名符合你的要求
```javascript
import(/* webpackChunkName: 'lodash' */ 'lodash')
```
需要安装`@babel/plugin-syntax-dynamic-import` 并且在babelrc的plugins里面配置，才会生效