## 简介

> 服务端渲染学习笔记。

## SSR 解决了什么问题 ?

```text
1. seo优化

2. 首屏渲染时间
```

## 如何实现 SSR ？

> 此处以一个项目例子目录结构进行介绍。

#### package.json 配置

- npm run build 执行 webpack 构建
- npm run server 运行 dist 静态服务目录

```
{
  "scripts": {
    "build": "rm -rf dist && webpack",
    "server": "nodemon --watch dist --watch src --ext html,scss,css,js,ts,jsx src/server.js"
  }
}
```

#### webpack 配置

- 配置多入口页面
- HtmlWebpackPlugin 构建前端渲染页面
- 开启 dist 目录构建 watch

```javascript
module.exports = {
  mode: 'production',
  entry: {
    // == 前端渲染 root 节点
    main: ['@babel/polyfill', './app/main.jsx'],
    // == 服务端渲染 root 节点
    ssr: ['@babel/polyfill', './app/ssr.jsx'],
    // == 服务端渲染 header 头部
    head: ['@babel/polyfill', './app/header.jsx'],
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: true,
        minifyCSS: true
      }
    })
  ],
  watch: true
}
```

#### app.js

- 将 build 目录挂载为静态服务目录

```javascript
const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app.use(router.routes());
app.use(serve(process.cwd() + '/dist'));

app.listen(80, () => {
  console.log('server started on port 80');
});
```

#### 路由层

```javascript
const Router = require('koa-router');
const controller = require('../controller');

const router = new Router();

router.get('home', '/', controller.home);

module.exports = router;
```

#### 控制层

- 获取 webpack 构建拿到的渲染页面 root 节点
- 获取 webpack 构建拿到的渲染页面 header 头部
- 渲染完成之后将数据挂载到 window 之上, 供前端渲染使用

```javascript
const api = require('../api');

module.exports = {
  home: async ctx => {
    // == 获取 页面数据 和 tdk 数据
    const [pageData, headData] = await Promise.all([api.home(ctx), api.headers(ctx)]);

    const distDir = process.cwd() + '/dist';
    // == 找到 dist 目录构建完成的 ssr.js 文件
    const ssrModuleRegExp = /^ssr(\.[^.]*)?\.js$/;
    const ssrModuleName = fs.readdirSync(distDir).find(filename => ssrModuleRegExp.test(filename));
    const ssr = require(distDir + '/' + ssrModuleName);
    
    // == 找到 dist 目录构建完成的 head.js 文件
    const headModuleRegExp = /^header(\.[^.]*)?\.js$/;
    const headModuleName = fs.readdirSync(distDir).find(filename => headModuleRegExp.test(filename));
    const header = require(distDir + '/' + headModuleName);

    // == 1. 获取 webpack 构建拿到的渲染页面 root 节点
    const pageString = ssr({url: ctx.url, context: pageData});
    // == 2. 获取 webpack 构建拿到的渲染页面 header 头部
    const headerString = head(headData);

    // == chunkHash 值
    const chunkHash = ssrModuleName.match(ssrModuleRegExp)[1] || '';

    // == 3. 渲染完成之后将数据挂载到 window 之上, 供前端渲染使用
    ctx.body = `<!DOCTYPE html>
      <html lang="en">
        <head>
          ${headerString}
        <body>
          ${pageString}
          <script type="text/javascript">
            window.__initStores=${JSON.stringify(pageData)}
            window.ssr = true;
          </script>
          <script type="text/javascript" src="/main${chunkHash}.js"></script>
        </body>
      </html>`;
  }
}
```

#### ssr.jsx

- 服务端渲染 DOM 是 React.renderToString
- 服务端渲染路由是 StaticRouter

```javascript
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './src/App';

export default function ssr({ url, context }) {
  useStaticRendering(true)
  const pageString = ReactDOM.renderToString(
    <div id="app">
      <Provider {...context} >
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </div>
  );
  return pageString;
}
```

#### header.jsx

- 服务端渲染 DOM 是 React.renderToString

```javascript
import React from 'react';
import ReactDOM from 'react-dom/server';

export default function head({title, description, keywords}) {
  return ReactDOM.renderToString(
    <React.Fragment>
      <title>{title}</title>
      <meta name="description" content={description}>
      <meta name="keywords" content={keywords}>
    </React.Fragment>
  );
}
```

#### main.jsx

- 前端渲染 DOM 是 React.hydrate
- 前端渲染路由是 BrowserRouter

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './src/App';

ReactDOM.hydrate(
  <Provider {...window.__initStores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
```

## 如何看待 SSR ？

```text
是否使用 SSR 还是要看业务是否需要: seo 检索优化；首屏渲染性能要求较高。

可以看到 SSR 也增加了项目的复杂度和可维护性: 需要在前端和服务端写 2 套渲染逻辑。
```

## 参考资料

- [React + Koa 实现服务端渲染(SSR)](https://juejin.cn/post/6844903608501141512)
- [React + Koa 实现服务端渲染(SSR) Part II](https://juejin.cn/post/6844903782787088392)
