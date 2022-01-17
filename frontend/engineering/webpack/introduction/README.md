## 简介

> webpack 学习笔记。

## 前端构建必要性

```text
开发复杂化：开发越来越复杂

框架去中心化：框架，包越来越零散

语言编译化

开发模块化
```

## webpack是什么

```text
webpack 是一个模块打包器，它可以递归的打包项目中的所有模块，最终生成几个打包后的文件。

支持 code-splitting、

模块化（AMD、ESM、CommonJS）、

强大插件系统（处理静态资源）、

全局分析；
```

## webpack版本功迭代

```text
V1: 编译、打包；HRM（模块热更新）；代码分割；文件处理；

V2: Tree Shaking；ES Module（1版本借助babel）；动态import（1版本通过require.ensure）；新的文档；

V3: Scope Hoisting（作用域提升、打包后性能提升）、Magic Comments（配合动态import使用）

V4: 零配置概念、模式（mode）、optimization(优化)；
```

## bundle、chunk、module是什么

```text
chunk：代码块；懒加载代码块（require.ensure）、提取公共的代码块（commensChunkPlugin）、动态加载的代码块（import）；

bundle：一堆资源（assets）合并在一起；

module：loaders处理完的文件都是一个一个的模块（如图片、csss等）；
```

## Loader、Plugin是什么

```text
Loader：处理非JS文件；转化为JS模块；

Plugin： 用来定义webpack打包过程的方式，一个插件是含有apply方法的对象，通过这个方法可以参与到整个webpack打包的各个流程（生命周期）。
```

## Tree-shaking是什么

```text
Tree-shaking 是指在打包中剔除哪些引入了，但是在代码中没有被用到的那些死代码

在 webpack3 中 Tree-shaking 是通过 UglifyJSPlugin 来 Tree-shaking JS

CSS需要使用 Purify-CSS 做到 Tree-shaking
```

## 框架对比

```text
1、rollup
优点：文件很小、执行很快（天生 Tree Shaking、ES6模块化工具）
缺点：不支持代码拆分（Code Splitting）、动态import、不支持CommonJS（可选插件）和AMD、模块的热更新（HMR）
应用：rollup适合构建框架，而webpack适合构建应用（主要看应用场景）

2、gulp
gulp严格上讲，模块化不是他强调的东西，他旨在规范前端开发流程，侧重整个过程的控制。（规范前端开发、侧重过程控制）
webpack更是明显强调模块化开发，而那些文件压缩合并、预处理等功能，不过是他附带的功能。（目的是模块化开发）
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
