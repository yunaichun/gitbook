## 简介

> webpack 编译JS和TS学习笔记。

## 编译ES 6/7 

#### 插件安装

```bash
# babel 
npm install  babel-loader @babel/core  --save-dev

# presets
npm  install  @babel/preset-env  --save-dev
```

#### presets规范

```text
es2015
es2016
es2017
babel-preset-stage 0-3
env
babel-preset-react
```

#### presets规范

```text
函数和方法：Generator、Set、Map、Array.from、Array.prototype.includes

使用的原因：presets 针对的是语法的规范，但是在低级浏览器，对于函数和方法没有相应的转换
```

#### 全局垫片

```bash
# 安装: 为应用准备
npm install babel-polyfill --save

# 使用
import 'babel-polyfill'
```

#### 局部垫片

```bash
# 安装: 为开发框架准备
npm install @babel/plugin-transform-runtime --save-dev
```

#### webpack 配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        ],
      },
    ]
  },
};
```

## 编译JS

#### 插件安装

```bash
# ts-loader
npm i typescipt ts-loader --save-dev

# ts-node
npm i typescipt ts-node --save-dev
```

#### 安装申明文件

```bash
# 法一
npm install @types/lodash --save
npm install @types/vue --save

# 法二
npm install typings -g
typings install lodash --save
```

#### 安装申明文件

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|jsx?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ]
  },
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
