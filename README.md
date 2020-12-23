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
### preload与prefetch
`prefetch`是在主线程加载完，等页面/网络空闲了才去加载js文件，而`preload`是和主线程一起加载

## 浏览器缓存与webpack
使用`contenthash`  
 原理 源代码不变，打包出来的哈希值不变  
 * 配置  
 在output选项中  
```javascript
 output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  }
```

## 打包一个library库
`webpack.config.js`
```javascript
const path = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: 'lodash',  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    libraryTarget: 'umd', // 通用引入方式
    library: 'library' // script标签引入全局变量
  }
}
```

## 打包typescript
首先要安装`ts-loader`,在config文件中配置  
```javascript
module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
```
接着在主目录下新建一个`tsconfig.json`文件 基础配置
```javascript
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "ES6", // es-nodule引入的方法
    "target": "ES5", // 打包生成的代码为es5
    "allowJs": true // 允许引入js库
  }
}
```
注意如果需要引入第三方包 比如lodash jquery这种的话需要设置allowJs为true  
如果需要ts强提示第三方包库的代码类型检测的话需要下载对应的`@type/xxx`包  
比如`"@types/lodash"` `"@types/jquery"`