## 简介

> webpack 简易实现学习笔记。

## webpack 配置文件

```js
'use strict';
const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
};
```

## webpack 编译入口

```js
const Compiler = require('./compiler');
const options = require('../simplepack.config');

const compiler = new Compiler(options);
compiler.run();
```

## babel 解析工具

```js
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

module.exports = {
  /** 将 js 文件解析成 AST【@babel/parser】 */
  getAST: (path) => {
    const content = fs.readFileSync(path, 'utf-8');
    return parser.parse(content, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'flow',
      ]
    });
  },

  /** 遍历AST: 分析依赖【@babel/traverse】 */
  getDependencis: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });
    return dependencies;
  },

  /** 将 ast 转换成 js 代码【@babel/core】 */
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
};
```

## webpack 编译函数

```js

const fs = require('fs');
const path = require('path');
const { getAST, getDependencis, transform } = require('./parser');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    /** 一、解析入口文件，收集依赖 */
    const entryModule = this.buildModule(this.entry, true);
    /** 二、解析入口文件的所有依赖 */
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    console.log(11111, this.modules);
    /** 三、根据 output 生成文件 */
    this.emitFiles();
  }

  /** 根据入口文件收集到文件依赖、转换为 es5 */
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      /** 绝对路径 */
      ast = getAST(filename);
    } else {
      /** 相对路径 */
      let absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getDependencis(ast),
      transformCode: transform(ast)
    };
  }

  /** 输出文件 */
  emitFiles() { 
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    /** 1、生成 文件名:文件内容生成函数 的键值对 */
    this.modules.map((_module) => {
      modules += `'${_module.filename}': function(require, module, exports) { 
        ${_module.transformCode}
      },`
    });
      
    /** 2、自定义实现 require 方法和 module.exports 方法 */
    const bundle = `
      (function(modules) {
        function require(fileName) {
          /** 获取 modules 对象的 fileName */
          const fn = modules[fileName];

          /** module 变量初始化, 会将依赖模块中的方法挂载到这里 */
          const module = { exports : {} };

          /** 执行 modules 对象的 fileName 函数 */
          fn(require, module, module.exports);

          /** 返回 module.exports, 即返回依赖模块中的方法 */
          /** 因为 babel 解析之后会将模块的方法挂载到 module.exports 中 */
          return module.exports;
        }

        /** 传入入口文件开始执行 */
        require('${this.entry}');
      })({${modules}})
    `;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
};
```

## 最终输出文件

```js
(function (modules) {
  function require(fileName) {
    /** 获取 modules 对象的 fileName */
    const fn = modules[fileName];

    /** module 变量初始化, 会将依赖模块中的方法挂载到这里 */
    const module = { exports: {} };

    /** 执行 modules 对象的 fileName 函数 */
    fn(require, module, module.exports);

    /** 返回 module.exports, 即返回依赖模块中的方法 */
    /** 因为 babel 解析之后会将模块的方法挂载到 module.exports 中 */
    return module.exports;
  }

  /** 传入入口文件开始执行 */
  require("/Users/yunaichun/GitHub/webpack-study/webpack-simple/src/index.js");
})({
  "/Users/yunaichun/GitHub/webpack-study/webpack-simple/src/index.js":
    function (require, module, exports) {
      "use strict";

      var _greeting = require("./greeting.js");

      document.write((0, _greeting.greeting)("Jane"));
    },
  "./greeting.js": function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.greeting = greeting;

    function greeting(name) {
      return "hello " + name;
    }
  },
});
```

## 项目地址

地址: https://github.com/yunaichun/webpack-study/tree/master/webpack-simple

## 参考资料

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [玩转 webpack](https://time.geekbang.org/course/intro/100028901)
- [3步助你理解webpack构建原理](https://learn.kaikeba.com/catalog/211875)
- [Webpack揭秘——走向高阶前端的必经之路 ](https://juejin.im/post/6844903685407916039)
- [webpack4 新特性](https://lz5z.com/webpack4-new/)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [Babel 的工作原理以及怎么写一个 Babel 插件](https://cloud.tencent.com/developer/article/1520124)
