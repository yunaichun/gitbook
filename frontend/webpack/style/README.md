## 简介

> webpack 处理样式学习笔记。

## 安装

```bash
# 提取css文件
npm install mini-css-extract-plugin --save-dev

# 处理css文件（style-loader是将将css文件插入到html页面中）
npm install css-loader  --save-dev

# 处理less文件
npm install less-loader  --save-dev 

# 用 JS 形变 CSS 的工具，执行的时机是在 css 打包的时候; style-css 的 transform 配置是在浏览器环境
# autoprefixer - 浏览器兼容、postcss-px2rem - 将 px 转换成 rem 
npm install postcss postcss-loader autoprefixer postcss-px2rem --save-dev

# 压缩和优化 css
npm install optimize-css-assets-webpack-plugin --save-dev

# 压缩和优化 css
npm install purgecss-webpack-plugin --save-dev
```

## webpack 配置

```js
module.exports = {
  module: {
    rules: [
      // == 加载 css
      {
        test: /.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
                px2rem({
                  remUnit: 50,
                }),
              ],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    // == 压缩和优化 css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // == 去除无用的 css 类（需要配合 MiniCssExtractPlugin 一起使用）
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(projectRoot, 'src')}/**/*`, { nodir: true }),
    }),
    // == 提取 css
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ]
};
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
