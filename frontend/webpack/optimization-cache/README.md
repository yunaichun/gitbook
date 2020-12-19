## 简介

> webpack 长缓存优化学习笔记。

## 简介

```text
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，

但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。
```

## 目的和做法

```text
1、目的是提升用户请求速度 

2、做法是有修改的代码，webpack打包时会给他一个新的版本号；没有修改的代码，版本号不变

方法一: 利用 chunkhash 可以保证第三方代码的版本号不会因为业务代码的改变而改变

方法二: 利用 webpack.NamedModulesPlugin() 或 webpack.HashedModuleIdsPlugin() 使未修改的文件再次打包文件名不变

方法三: 动态 import，利用 magic comments 添加动态模块的名称
```

## webpack 配置

```js
module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    // == 利用 chunkhash 可以保证第三方代码的版本号不会因为业务代码的改变而改变
    filename: '[name]_[chunkhash:8].js',
  },
  plugins: [
    // == 原因：业务代码引入模块发生变化（如import 新的模块） -> chunk的id发生变化 -> chunkhash变化 -> 最终导致第三方代码的版本号也会发生变化
    // == chunk 添加名称
    new webpack.NamedChunksPlugin(),
    // == module 添加名称
    new webpack.NamedModulesPlugin(),
  ]
}
```

```js
// == import 动态引用模块，指定模块名称
import(
    /* webpackChunkName: async-chunk-name */
    /* webpackMode: lazy */
    './pageB'
).then(function(pageB) {console.log(pageB)});
```

## 项目地址

地址: https://github.com/yunaichun/webpack-study

## 参考资料

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [玩转 webpack](https://time.geekbang.org/course/intro/100028901)
- [3步助你理解webpack构建原理](https://learn.kaikeba.com/catalog/211875)
- [Webpack揭秘——走向高阶前端的必经之路 ](https://juejin.im/post/6844903685407916039)
- [webpack4 新特性](https://lz5z.com/webpack4-new/)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [Babel 的工作原理以及怎么写一个 Babel 插件](https://cloud.tencent.com/developer/article/1520124)
