## 简介

> 浏览器异步任务学习笔记。

## 浏览器异步任务 

**JS 单线程: 一个时间只能做一件事情**

```text
setTimeout 和 setInterval 

DOM 事件

image 标签的 onload

Ajax
```

## ES6 异步方法

```text
Promise 构造函数

Generator 生成器函数

async 函数

// == jQuery 里 $.Deferred() 对象
```

## Event Loop

```text
同步任务会放在主线程里面，异步任务会放入任务队列里面；

主线程执行栈中的同步任务执行完了以后，就去取任务队列中的异步任务。
```

## 微任务和宏任务

```text
异步任务分为微任务和宏任务。微任务会在宏任务之前执行。

setTimeout 就是作为宏任务来存在的，requestAnimationFrame 也算是宏任务；Promise.then 则是具有代表性的微任务。
```

## requestAnimationFrame

```text
屏幕刷新频率: 指显示器每秒刷新次数，目前，大部分显示器刷新频率为 60 次/s；屏幕每次刷新时间间隔 1000 / 60 = 16.7 ms。

requestAnimationFrame 与 setTimeout 不同之处在于: setTimeout 是在等待指定毫秒被调用，requestAnimationFrame 则是在每次屏幕刷新被调用。
```

## requestIdleCallback

```text
可以将 requestIdleCallback 视为 setTimeout，但是浏览器将在主线程空闲时运行回调，而不是告诉它何时运行。

requestIdleCallback 还为我们提供了截止日期参数。我们可以使用它来检查浏览器需要再次控制之前需要多少时间。
```

## JS脚本异步加载

```text
async: 脚本一旦加载完成立即执行。

defer: 脚本在 DOMContentLoaded 事件之前执行。
```

## 资源预加载

```html
<!-- preload 适合用来预加载被隐藏的首屏关键资源 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- prefetch 的资源一般来说优先级较低，会在浏览器『空闲』时进行下载。 -->
<link rel="prefetch" href="//example.com/industry-qualification-audit/js/common-main.550d4.chunk.js">
<link rel="prefetch" href="//example.com/industry-qualification-audit/js/Food.86661.chunk.js">
```

## 预解析DNS

```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//host_name_to_prefetch.com">

<!-- a 标签默认是打开 DNS 预解析；页面如果是 https 协议开头的，会默认关闭 a 标签的预解析；此配置会强制打开 a 标签的预解析 -->
<meta http-equiv="x-dns-prefetch-control" content="on">
```

## 参考资料

- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [微任务、宏任务与Event-Loop](https://juejin.cn/post/6844903657264136200)
- [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
- [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
- [你不知道的 requestIdleCallback](https://zhuanlan.zhihu.com/p/60189423)
- [async和defer属性的区别](https://juejin.cn/post/6844904015956803597)
- [代码分割结合 Prefetch 完美优化单页应用加载性能](https://juejin.cn/post/6844903502519468039)
- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)
