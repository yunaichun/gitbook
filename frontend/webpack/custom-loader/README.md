## 简介

> webpack 自定义 loader 学习笔记。

## 内容替换 loader

#### 编写loader 

```js
const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function(source) {
    // == 一、获取 loader 参数
    const {name} = loaderUtils.getOptions(this);
    console.log('loader option params is:', name);

    // == 二、关闭 loader 缓存【缓存条件: loader 的结果在相同的输入下有确定的输出（有依赖的 loader 无法使用缓存）】
    this.cacheable(false);

    // == 三、同步 loader 结果处理
    const json = source
        .replace('foo', '')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    // == 四、通过 this.emitFile 进行文件写入
    const url = loaderUtils.interpolateName(
        this, // == 上下文环境
        "[name].[ext]", // == 源文件: 名称和扩展名
        json // == 内容
    );
    this.emitFile(path.join(__dirname, `../dist/${url}`), json);
    
    // == 五、返回给下一个 loader 的数据
    // == 异步处理结果用 this.async()
    return json;
}
```

#### 测试loader

```js
const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    // == 入口资源绝对路径
    resource: path.join(__dirname, './src/demo.txt'),
    // == loaders 绝对路径
    loaders: [
        {
            loader: path.join(__dirname, './loaders/raw-loader.js'),
            options: {
                name: 'test',
            },
        }
    ],
    // == 提供额外的上下文信息
    context: {
        minimize: true,
        // == loader-runner 还不支持 emitFile，需要额外实现并注入
        emitFile: (path, source) => {
            fs.writeFileSync(path, source, 'utf8');
        },
    },
    // == 读取文件方法
    readResource: fs.readFile.bind(fs),
}, (err, result) => {
    err ? console.log(err) : console.log(result);
});
```

## 合成雪碧图 loader

#### 编写loader

```js
// Load in dependencies
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

module.exports = function(source) {
    // == 异步结果处理
    const callback = this.async();
    const imgs = source.match(/url\((\S*)\?__sprite\)/g);
    const matchedImgs = [];

    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite\)/)[1];
        matchedImgs.push(path.join(__dirname, `../src/${img}`));
    }

    const _this = this;
    Spritesmith.run({
        src: matchedImgs,
    }, function handleResult (err, result) {
        console.log(err, result);
        
        _this.emitFile(path.join(__dirname, '../dist/sprite.png'), result.image);
        source = source.replace(/url\((\S*)\?__sprite\)/g, match => `url(dist/sprite.png)`);
        _this.emitFile(path.join(__dirname, '../dist/index.css'), source);

        // == 处理后的结果返回给下一个 loader
        callback(err, source);
    });
}
```

#### 测试loader

```js
const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    // == 入口资源绝对路径
    resource: path.join(__dirname, './src/index.css'),
    // == loaders 绝对路径
    loaders: [
        path.join(__dirname, './loaders/sprite-loader.js')
    ],
    // == 提供额外的上下文信息
    context: {
        minimize: true,
        // == loader-runner 还不支持 emitFile，需要额外实现并注入
        emitFile: (path, source) => {
            fs.writeFileSync(path, source, 'utf8');
        },
    },
    // == 读取文件方法
    readResource: fs.readFile.bind(fs),
}, (err, result) => {
    err ? console.log(err) : console.log(result);
});
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
