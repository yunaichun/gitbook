## 简介

> 浏览器 BOM 学习笔记。

## 网页高度

> 整个网页宽高

```js
const scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;

const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
```

> 可视窗口宽高

```js
const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
```

> 可视窗口顶部距离网页顶部高度

```js
const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
```

> 关系

```js
scrollHeight === clientHeight + scrollTop
```

## 元素距离可视区域距离

> 元素顶部距离可视区域顶部距离

```js
dom.getBoundingClientRect().top;
```

> 元素底部距离可视区域顶部距离

```js
const bottom = dom.getBoundingClientRect().bottom;
```

> 元素左边距离可视区域左边距离

```js
const left = dom.getBoundingClientRect().left;
```

> 元素右边距离可视区域左边距离

```js
const right = dom.getBoundingClientRect().right;
```

> 元素宽度

```js
const width = dom.getBoundingClientRect().width;
```

> 元素高度

```js
const height = dom.getBoundingClientRect().height;
```

## 元素在屏幕漏出 50%

```js
// == 元素顶部从可视区域底部漏出 50%
const isExposeTop = clientHeight - top >= height / 2;

// == 元素底部从可视区域顶部漏出 50%
const isExposeBottom = bottom >= height / 2;

// == 元素右边从可视区域左边漏出 50%
const isExposeLeft = right >= width / 2;

// == 元素左边从可视区域右边漏出 50%
const isExposeRight= clientHeight - left >= width / 2;
```

## 下拉刷新

```js
window.addEventListener('scroll', async () => {
    if (scrollHeight - clientHeight - scrollTop < 10) {
        // == 刷新请求
    }
})
```

## 参考资料

- [Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- [web移动端浮层滚动阻止window窗体滚动JS/CSS处理](https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/)
