## 简介

> 浏览器跨域和安全学习笔记。

## 什么是同源策略

```text
协议相同

域名相同

端口相同
```

## 同源策略有哪些限制

```text
1、DOM 层面: DOM 无法获得

2、数据层面: Cookie、LocalStorage、IndexDB 不会共享

3、网络层面: Ajax 请求不能发送 
```

## 前端有哪些跨域方案

**1、JSONP**


```text
1. 请求方动态创建一个script标签，其src指向响应方，同时传入一个查询参数？callback=functionName

2. 响应方根据查询参数callback构造形如 functionName.call(undefined,'数据')

3. 请求方接收到响应方传回来的数据，就会执行functionName函数

4. 那么请求方就拿到了数据
```

**2、webpack 代理配置**

```js
module.exports = {
  devServer: {
    port: 11111,
    open: true,
    host: 'dev.qingting.fm',
    proxy: {
      '/': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          logLevel: 'debug',
      }
    }
  }
};
```

**3、Nginx 反向代理**

```conf
server {
    # 将前后端都反向代理到本地 8080 端口
    listen                8080;
    server_name           host;
    
    # 前端地址
    location  / {
        proxy_pass        http://host:4000;
    }

    # api 地址
    location /v1/ {
        proxy_pass        http://ip:3000;
    }
}
```

**4、后端设置 CORS**

```js
module.exports = async(ctx, next) => {
  // == 当有自定义请求头字段的时候，浏览器会发送一次预检 OPTIONS 请求
  // == 设置Credentials，就不能设置*。【携带session】
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
  // ctx.set('Access-Control-Allow-Credentials', true);

  if (ctx.method == 'OPTIONS') {
    ctx.body = '';
    ctx.status = 204;
  } else {
    await next();
  }
};
```

## 如何创建 Ajax 请求

```js
function createXMLHttpRequest(type, url, async = true, data) {
  let xhr = null;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {}
  };
  xhr.open(type, url, async);
  xhr.send(data);
}
```

## 参考资料

- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [JSONP 动态创建script进行跨域请求](https://zhuanlan.zhihu.com/p/43018503)
- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)
