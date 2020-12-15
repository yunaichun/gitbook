## 简介

> express 学习笔记。

## 中间件原理

> 模拟实现

```js
let http = require('http');

function express() {
    let middleware = [];
    let app = function(req, res) {
        let i = 0;
        function next() {
            let task = middleware[i++];
            if (!task) return;
            // == 函数内部调用自身函数: 里面传入第二个中间件
            task(req, res, next);
        }

        // == 从第一个中间件开始执行
        next();
    };
    app.use = function(callback) {
        middleware.push(callback);
    }
    return app;
}


let app = express();
function middlewareA(req, res, next) {
    console.log('middlewareA before next()');
    next();
    console.log('middlewareA after next()');
}
function middlewareB(req, res, next) {
    console.log('middlewareB before next()');
    next();
    console.log('middlewareB after next()');
}
app.use(middlewareA);
app.use(middlewareB);

http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});
```

## 源码阅读

> 地址: https://github.com/yunaichun/nodejs-study/tree/master/express-src

## 参考资料

- [Express源码解析](https://lq782655835.github.io/blogs/node/node-code-express.html)
