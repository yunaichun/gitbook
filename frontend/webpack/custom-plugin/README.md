## 简介

> webpack 自定义 plugin 学习笔记。

## 打包源文件 plugin

```js
const path = require('path');
// == 文档地址: https://stuk.github.io/jszip/documentation/examples.html
const JSZip = require('jszip');
const { RawSource } = require('webpack-sources');
const zip = new JSZip();

class ZipPlugin {
    constructor(options) {
        // == 插件传递参数
        this.options = options;
    }

    // == 通过插件的 apply 方法完成注入
    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin1', (compilation, callback) => {
            // == 1、生成压缩文件名内容
            const folder = zip.folder(this.options.folderName);
            // == 2、压缩文件内容: 文件名 + 文件内容
            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            // == 3、执行压缩
            zip.generateAsync({
                type: 'nodebuffer',
            }).then((contentBuffer) => {
                // == 绝对路径: .../dist/offline.zip
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.folderName + '.zip',
                );
                // == 相对路径: .../dist/offline.zip
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath,
                );

                // == 3、compilation 上的 assets 可以用于文件写入
                // == 文件写入需要使用 webpack-sources (https://www.npmjs.com/package/webpack-sources)
                compilation.assets[outputRelativePath] = new RawSource(contentBuffer);

                callback();
            });
        });

        // == 二、插件的错误处理
        // compilation.warnings.push('warning 1111');
        // compilation.errors.push('error 222');
    }
}
module.exports = ZipPlugin;
```

## webpack 引入插件

```js
const path = require('path');
const ZipPlugin = require('./plugins/zip-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },
    mode: 'production',
    plugins: [
        new ZipPlugin({
            folderName: 'offline',
        }),
    ]
}
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
