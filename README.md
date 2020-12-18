# webpack系统学习
## tree shaking的配置  
如果是pro环境的话就无需额外的配置了  
dev环境下需要在webpack.config.js文件下添加一个
``` 
optimization: {
    usedExports: true
}
```
还要在package.json里面配置一个
```"sideEffects": false```