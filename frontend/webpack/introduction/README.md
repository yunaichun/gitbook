## 简介

> Webpack 学习笔记。

## 为什么前端需要构建？

```text
开发复杂化：开发越来越复杂

框架去中心化：框架，包越来越零散

语言编译化

开发模块化
```

## 什么是webpack？为什么选择webpack？

```text
webpac 是一个模块打包器，它可以递归的打包项目中的所有模块，最终生成几个打包后的文件。

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

## 什么是bundle、chunk、module？

```text
chunk：代码块；懒加载代码块（require.ensure）、提取公共的代码块（commensChunkPlugin）、动态加载的代码块（import）；

bundle：一堆资源（assets）合并在一起；

module：loaders处理完的文件都是一个一个的模块（如图片、csss等）；
```

## 什么是Loader、Plugin？

```text
Loader：处理非JS文件；转化为JS模块；

Plugin： 用来定义webpack打包过程的方式，一个插件是含有apply方法的对象，通过这个方法可以参与到整个webpack打包的各个流程（生命周期）。
```

## webpack-dev-server 和模块热更新是什么？

```text
1、webpack-dev-server和http服务器如nginx有什么区别？（Express+hot-middleware）
webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统http服务队开发更加简单有效。

2、什么是模块热更新？（websocket连接）
是webpack的一个功能，可以使修改后的代码不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。
```

## 什么是Tree-shaking？CSS可以Tree-shaking吗？

```text
Tree-shaking是指在打包中取出哪些引入了，但是在代码中没有被用到的那些死代码。

在webpack中Tree-shaking是通过UglifyJSPlugin来Tree-shaking JS；

CSS需要使用Purify-CSS。
```

## 什么是长缓存？在webpack中如何做到长缓存优化？

```text
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，
但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。

在webpack中可以在output给输出的文件指定chunkhash，并且分离经常更新的代码和框架代码。
通过NamedModulesPlugin或是HashedModuleIdsPlugin使未修改的文件再次打包文件名不变。
```

## 如何优化代码build速度？

```text
1、减少babel-loader处理范围，开启缓存options.cacheDirectory

2、去掉sourcemap配置，减少resolve，

3、分离第三方vendor代码和业务app代码
DLLPlugin：会生成一个 map 的 JSON 文件，与打包文件一一对应映射关系
DLLReferencePlugin：在打包 app 的时候回引用这个映射关系

4、UglifyJsPlugin中使用parallel（平行线程并行处理）和cache配置（使用缓存）

5、使用happypack使loader可以并行处理，减少文件处理的时间，
cache-loader缓存loader处理的结果，
升级node和webpack
```

## 对比

```text
1、rollup
优点：文件很小、执行很快（天生 Tree Shaking、ES6模块化工具）
缺点：不支持代码拆分（Code Splitting）、动态import、不支持CommonJS（可选插件）和AMD、模块的热更新（HMR）
应用：rollup适合构建框架，而webpack适合构建应用（主要看应用场景）

2、gulp
gulp严格上讲，模块化不是他强调的东西，他旨在规范前端开发流程，侧重整个过程的控制。（规范前端开发、侧重过程控制）
webpack更是明显强调模块化开发，而那些文件压缩合并、预处理等功能，不过是他附带的功能。（目的是模块化开发）
```

## 参考资料

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [极客时间 - 玩转 webpack](https://time.geekbang.org/course/intro/100028901)
- [开课吧 - 3步助你理解webpack构建原理](https://learn.kaikeba.com/catalog/211875)
- [字节跳动 - Webpack 揭秘](https://juejin.im/post/6844903685407916039)
- [webpack4 新特性](https://lz5z.com/webpack4-new/)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [Babel 的工作原理以及怎么写一个 Babel 插件](https://cloud.tencent.com/developer/article/1520124)
