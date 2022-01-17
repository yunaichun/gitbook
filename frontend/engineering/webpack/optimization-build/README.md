## 简介

> webpack 优化打包速度学习笔记。

## 打包结果分析

```js
// == 1、官方分析工具: http://webpack.github.io/analyse
webpack --profile --json > stats.json

// == 2、插件: webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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

## webpack 配置

```js
module.exports = {
  mode: 'production',
  module: {
    rules: [
      // == 加载 js
      {
        test: /\.jsx?$/,
        // == 缩小构建目标
        exclude: /(node_modules|bower_components)/,
        use: [
          // == 多进程：解析资源
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          {
            // == 开启缓存：cacheDirectory=true 转换 js 语法缓存
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
    // == 加快构建速度：预编译资源文件
    new webpack.DllReferencePlugin({
      manifest: DLLMainfestFile,
    }),
    // == 开启硬件缓存
    new HardSourceWebpackPlugin(),
  ]
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
  // == 减少文件索搜范围
  resolve: {
      alias: {
          'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
          '@': path.resolve('src'),
      },
      extensions: ['.js'],
      mainFields: ['main']
  }
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
