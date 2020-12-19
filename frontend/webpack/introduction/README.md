## 简介

> Webpack 学习笔记。

## 前端构建必要性

```text
开发复杂化：开发越来越复杂

框架去中心化：框架，包越来越零散

语言编译化

开发模块化
```

## webpack是什么

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

## webpack-dev-server和模块热更新是什么

```text
1、webpack-dev-server和http服务器如nginx有什么区别？（Express+hot-middleware）
webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统http服务队开发更加简单有效。

2、什么是模块热更新？（websocket连接）
是webpack的一个功能，可以使修改后的代码不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。
```

## Tree-shaking是什么

```text
Tree-shaking是指在打包中取出哪些引入了，但是在代码中没有被用到的那些死代码。

在webpack中Tree-shaking是通过UglifyJSPlugin来Tree-shaking JS；

CSS需要使用Purify-CSS做到Tree-shaking
```

## 如何做到长缓存优化

```text
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，
但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。

在webpack中可以在output给输出的文件指定chunkhash，并且分离经常更新的代码和框架代码。
通过NamedModulesPlugin或是HashedModuleIdsPlugin使未修改的文件再次打包文件名不变。
```

## 如何优化代码构建速度

```text
1、缩小构建范围
减少 babel-loader 处理范围
减少 resolve 查找文件范围

2、使用 TreeShaking 擦除无用的 CSS
plugin 里通过 purgecss-webpack-plugin 插件去除无用的css类（需要配合 mini-css-extract-plugin 插件一起使用）
plugin 里通过 optimize-css-assets-webpack-plugin 插件开启压缩和优化css

3、预编译资源模块
webpack.DllPlugin: 会生成一个 map 的 JSON 文件，与打包文件一一对应映射关系
webpack.DLLReferencePlugin: 在打包 app 的时候回引用这个映射关系

4、利用缓存提升二次构建速度
babel-loader 通过设置 babel-loader?cacheDirectory=true 开启转换js语法缓存
optimization.minimizer 里通过 terser-webpack-plugin 开启代码压缩时开启缓存（cache: true）
plugin 里通过 hard-source-webpack-plugin 插件开启硬件缓存

5、开启多进程
loader 里通过 thread-loader 多进程构建、
optimization.minimizer 里通过 terser-webpack-plugin 代码并行压缩（parallel: true）

6、其他
去掉 sourcemap 配置
升级 node 和 webpack
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

## 参考资料

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [极客时间 - 玩转 webpack](https://time.geekbang.org/course/intro/100028901)
- [开课吧 - 3步助你理解webpack构建原理](https://learn.kaikeba.com/catalog/211875)
- [字节跳动 - Webpack 揭秘](https://juejin.im/post/6844903685407916039)
- [webpack4 新特性](https://lz5z.com/webpack4-new/)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [Babel 的工作原理以及怎么写一个 Babel 插件](https://cloud.tencent.com/developer/article/1520124)
