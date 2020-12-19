## 简介

> Webpack 开发环境配置学习笔记。

## 安装

```text
1、配置 webpack-dev-server 和模块热更新
npm install webpack-dev-server --save-dev

2、开启SourceMap调试

3、设置ESLint
npm install eslint babel-eslint eslint-config-airbnb-base eslint-config-standard --save-dev
```

## webpack-dev-server简介

```text
1、webpack-dev-server和http服务器如nginx有什么区别？（Express+hot-middleware）
webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统http服务队开发更加简单有效。

2、什么是模块热更新？（websocket连接）
是webpack的一个功能，可以使修改后的代码不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。
```

## webpack 配置

```js
module.exports = {
  // == 开发环境服务和代理
  devServer: {
    overlay: true,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://localhost',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
    // == output 配置项 publicPath: '',
    contentBase: './dist',
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // == 开启 source map
  devtool: 'cheap-source-map',
};
```

## .eslintrc.js 配置

```js
module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true
  },
  plugins: [
  ],
  rules: [
  ],
};
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
