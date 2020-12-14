## 简介

> PWA 渐进式 web app 学习笔记。

## manifest.json 应用清单

**代表应用程序配置**

```json
{
    "name": "豆瓣App-PWA",
    "short_name": "豆瓣App",
    "start_url": "/index.html",
    "icons": [
       {
            "src": "image/start.png",
            "sizes": "144x144",
            "type": "image/png"
       }
    ],
    "background_color": "skyblue",
    "theme_color": "yellow",
    "display": "standalone"
}
```

## Web Worker

**Web Worker 是脱离浏览器主线程之外的线程，处理完成之后可以通过 postMessage 告诉主线程**

> 主线程: index.js

```javascript
let worker = new Worker('webworker.js');
worker.addEventListener('message', e => {
    this.setState({ total: e.data.total })
});
```

> web worker 线程: webworker.js

```javascript
let total = 0;
for (let i = 0, len = 1000000; i < len; i++) {
    total += i;
}
self.postMessage({ total });
```

## Service Worker

**Service Worker 是具备缓存功能的 Web Worker**

> 主线程: index.js

```javascript
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('serviceworker.js')
        .then(registration => console.log(registration))
        .catch(err => console.log(err));
    }
})
```

> service worker 线程: serviceworker.js

```javascript
// == service worker 注册的时候调用: 添加缓存
self.addEventListener('install', event => {
    console.log('install', event);

    // == self.skipWaiting(): Service Worker 一旦更新，需要等所有的终端都关闭之后，再重新打开页面才能激活新的 Service Worker，这个过程太复杂了
    // == event.waitUtil(): 等待 self.skipWaiting() 结束后才进入到 activate 状态
    event.waitUntil(self.skipWaiting());
});

// == service worker 注册之后调用: 删除旧缓存
self.addEventListener('activate', event => {
    console.log('activate', event);
    // == 为了保证 Service Worker 激活之后能够马上作用于所有的终端，通常在激活 Service Worker 后，通过在其中调用 self.clients.claim() 方法控制未受控制的客户端
    event.waitUntil(self.clients.claim());
});

// == 会拦截所有的请求: 取网络或缓存
self.addEventListener('fetch', event => {
    console.log('fetch', event);
});
```

## caches

**可以在 ServiceWorker 里添加缓存功能**

> 主线程: index.js

```javascript
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        // 由于 127.0.0.1:8000 是所有测试 Demo 的 host
        // 为了防止作用域污染，将安装前注销所有已生效的 Service Worker
        navigator.serviceWorker.getRegistrations()
        .then(regs => {
            for (let reg of regs) {
                reg.unregister()
            }
            navigator.serviceWorker
            .register('cachestorage.js')
            .then(registration => console.log(registration))
            .catch(err => console.log(err));
        })
    }
});
```

> service worker 线程: cachestorage.js

```javascript
const CACHE_NAME = 'cache_v1';

// == service worker 注册的时候调用: 添加缓存
self.addEventListener('install', async event => {
    console.log('install', event);

    // == 开启一个 cache, 得到一个 cache 对象
    const cache = await caches.open(CACHE_NAME);
    // == cache 对象可以存储资源
    await cache.addAll([
        '/',
        '/image/start.png',
        '/manifest.json',
        '/index.js',
        '/index.css',
        // '/api'
    ]);

    // == self.skipWaiting() : 会让 service worker 跳过等待，直接进入到 activate 状态
    await self.skipWaiting();
});

// == service worker 注册之后调用: 删除旧缓存
self.addEventListener('activate', async event => {
    console.log('activate', event);

    // == 获取所有缓存资源的 key
    const keys = await caches.keys();
    keys.forEach(key => { if (key !== CACHE_NAME) caches.key(); })

    // == 表示 service worker 激活后，立即获得执行权
    await self.clients.claim();
});

// == 会拦截所有的请求: 取网络或缓存
self.addEventListener('fetch', event => {
    console.log('fetch', event);

    const req = event.request;
    // == 只缓存同源的内容
    const url = new URL(req.url);
    if (url.origin !== self.origin) {
        return;
    }
    // == 接口请求优先走网络，静态资源优先走缓存
    if (req.url.includes('/api')) {
        event.respondWith(networkFirst(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});

async function networkFirst(req) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const fresh = await fetch(req);
        // == 此处一定要添加 clone
        cache.put(req, fresh.clone());
        return fresh;
    } catch(e) {
        const cached = await cache.match(req);
        return cached;
    }
}

async function cacheFirst(req) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) {
        return cached
    } else {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    }
}
```

## Notification

**为 web 应用添加推送通知**

```javascript
 // == 添加推送
if (Notification.permission === 'default') {
    Notification.requestPermission();
}
if (!navigator.onLine) {
    new Notification('提示', { 
        body: '您当前已经断网, 访问的是缓存资源'
    });
}
window.addEventListener('online', () => {
    new Notification('提示', {
        body: '您已经联网, 请刷新访问最新数据'
    });
});
```

## 练习 Demo

> 地址: https://github.com/yunaichun/pwa-study

## 参考资料

- [《PWA 应用实战》](https://lavas-project.github.io/pwa-book/)
- [Progressive Web Apps](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp)
- [PWA-3小时带你实现渐进式WebAPP](https://www.bilibili.com/video/BV1wt411E7QD?from=search&seid=4359254532906031342)
- [Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
- [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
- [PWA fetch 事件不生效](https://juejin.cn/post/6844903617460174855)
