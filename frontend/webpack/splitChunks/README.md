## 简介

> webpack 代码分割学习笔记。

## 优点

```text
同步代码分割: 减少代码冗余、提高加载速度
异步代码分割: 需要用到的代码才去加载、提升加载速度  
```

## 同步代码分割

#### webpack3

```js
module.exports = {
  plugins: [
      // 提取 公共 代码
      new webpack.optimize.CommonsChunkPlugin({
          name: "common",
          minChunks: 2,
          chunks: ['app', 'app2'] 
      }),
      // 提取 第三方依赖 代码
      new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: Infinity
      }),
      // 提取 webpack 生成代码
      new webpack.optimize.CommonsChunkPlugin({
          name: "manifest",
          minChunks: Infinity
      })
  ]
}
 
```

#### webpack4

```js
module.exports = {
  optimization: {
    // == 代码分割
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    // == 多进程：代码并行压缩
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // == 代码并行压缩时开启缓存
        cache: true,
      }),
    ],
  },
}
 
```

## 异步代码分割

```js
// == import 动态引用模块，指定模块名称
import(
    /* webpackChunkName: async-chunk-name */
    /* webpackMode: lazy */
    './pageB'
).then(function(pageB) {console.log(pageB)});
```

## 参考资料

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [玩转 webpack](https://time.geekbang.org/course/intro/100028901)
- [3步助你理解webpack构建原理](https://learn.kaikeba.com/catalog/211875)
- [Webpack揭秘——走向高阶前端的必经之路 ](https://juejin.im/post/6844903685407916039)
- [webpack4 新特性](https://lz5z.com/webpack4-new/)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [Babel 的工作原理以及怎么写一个 Babel 插件](https://cloud.tencent.com/developer/article/1520124)
