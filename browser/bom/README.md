## 简介

> 浏览器对象模型学习笔记。

## BOM相关

#### 网页高度

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

#### 元素距离可视区域距离

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

#### 元素在屏幕漏出 50%

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

#### 下拉刷新

```js
window.addEventListener('scroll', async () => {
    if (scrollHeight - clientHeight - scrollTop < 10) {
        // == 刷新请求
    }
})
```

## DOM相关

#### DOM事件的级别(DOM标准定义的)

```text
DOM0 element.onclick

DOM2 element.addEventListener('click', function() {}, false) // IEattachEvent

DOM3 element.addEventListener('keyup', function() {}, false) // 增加了很多事件类型
```

#### DOM事件模型

```text
捕获：捕获阶段触发，设为true

冒泡：默认冒泡阶段触发，设为false
```

#### DOM事件流

```text
点击鼠标左键怎么传到页面上的？怎么响应的？

第一阶段：捕获阶段。

第二阶段：目标阶段。比如说点了当前按钮，事件通过捕获到达目标元素，这就是目标阶段

第三阶段：冒泡阶段。从目标元素再上传的window对象，这就是冒泡的过程
```

#### DOM事件捕获的具体流程

```text
1、window

2、document

3、documentElement

4、body

5、target
```

```js
var ev = document.getElementById('ev');
window.addEventListener('click', function (e) {
    console.log('window captrue');
}, true);
document.addEventListener('click', function (e) {
    console.log('document captrue');
}, true);
document.documentElement.addEventListener('click', function (e) {
    console.log('html captrue');
}, true);
document.body.addEventListener('click', function (e) {
    console.log('body captrue');
}, true);
ev.addEventListener('click', function (e) {
    console.log('ev captrue');
}, true);
```

#### Event对象的常见应用

```text
1、阻止默认行为：event.preventDefault()

2、阻止默认行为：event.stopPropagation()

3、阻止相同事件：event.stopImmediatePropagation() 【一个按钮绑定多个click事件】

4、绑定事件对象：event.currentTarget

5、当前点击对象：event.target
```

#### 自定义事件

**Event**

```js
// == 定义事件
var ev = document.getElementById('ev');
ev.addEventListener('test', function () {
    console.log('test dispatch');
});

// == 触发事件
var eve = new Event('test’);
setTimeout(function () { ev.dispatchEvent(eve); }, 1000);
```

**CustomEvent**

```js
// == 定义事件
var ev = document.getElementById('ev');
ev.addEventListener('test2', function (e) {
    console.log(111, e, e.detail);
    console.log('test dispatch');
});

// == 触发事件
var eve2 = new CustomEvent('test2', {
    detail: { username: “davidwalsh" }
});
setTimeout(function () { ev.dispatchEvent(eve2); }, 1000);
```

## 参考资料

- [Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- [web移动端浮层滚动阻止window窗体滚动JS/CSS处理](https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/)
