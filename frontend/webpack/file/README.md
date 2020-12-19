## 简介

> Webpack 处理资源文件学习笔记。

## 安装

```bash
# 处理图片和字体
npm install file-loader --save-dev

# 压缩图片
npm install image-webpack-loader  --save-dev

# 生成HTML
npm install html-webpack-plugin  --save-dev 
```

## webpack 配置

```js
module.exports = {
  module: {
    rules: [
      // == 加载图片
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          // == 加载图片
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: '[name]_[hash:8].[ext]',
            },
          },
          // == 压缩图片
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // == 加载字体
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: `${pageName}.html`,
      template: path.join(projectRoot, `./src/${pageName}/index.html`),
      chunks: ['vendors', pageName],
      minify: {
        html5: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: false,
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
    })
  ]
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
