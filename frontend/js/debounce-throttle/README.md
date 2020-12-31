## 简介

> js 防抖与节流学习笔记。

## 防抖

```js
// == 防抖: 密集事件间隔时间小于 interval，只响应最后一次
function debounce(fn, delay = 200){
    let timer;
    return function(...args) {
        const _this = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            timer = null;
            fn.apply(_this, args);
        }, delay);
    };
}
```

## 节流

```js
// == 节流: 密集事件间隔时间小于 interval，间隔 interval 响应一次
function throttle(fn, interval = 200) {
    const [timer, last] = [];
    return function(...args) {
        const _this = this;
        const now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                last = now;
                fn.apply(_this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}
```

## 参考资料

- [JS事件中防抖debounce和节流throttle概念原理的学习](http://webfront-js.com/articaldetail/99.html)
