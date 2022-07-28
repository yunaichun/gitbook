## 简介

> CSS 响应式布局学习笔记。

## 浏览器视口概念

```text
1、理想视口：可视视口 = 布局视口
    视口设置：width = device-width

2、device-width = 设备物理分辨率 / (设备像素比 * 缩放比) = document.documentElement.clientWidth
当 设备像素比 * 缩放比 = 1 时, device-width = 设备物理分辨率(设计稿实际尺寸)

3、DPR(设备像素比) 可通过 window.devicePixelRatio 获取
```

## 响应式方案-rem

> 代码设置

```javascript
! function(win) {
    var v, initial_scale, timeCode, dom = win.document,
        domEle = dom.documentElement,
        viewport = dom.querySelector('meta[name="viewport"]'),
        flexible = dom.querySelector('meta[name="flexible"]');
    if (viewport) {
        // == meta 标签有 viewport
        var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        if (o) {
            initial_scale = parseFloat(o[2]);
            v = parseInt(1 / initial_scale);
        }
    } else if (flexible) {
        // == meta 标签有 flexible
        var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
        if (o) {
            v = parseFloat(o[2]);
            initial_scale = parseFloat((1 / v).toFixed(2))
        }
    }
    // == meta 标签无 viewport 和 flexible: 设备像素比 * 缩放比 = 1
    if (!v && !initial_scale) {
        var n = (win.navigator.appVersion.match(/android/gi),
            win.navigator.appVersion.match(/iphone/gi));
        v = win.devicePixelRatio;
        v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
    }
    // == meta 设置 viewport
    if (domEle.setAttribute("data-dpr", v), !viewport) {
        if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
            domEle.firstElementChild.appendChild(viewport)
        } else {
            var m = dom.createElement("div");
            m.appendChild(viewport), dom.write(m.innerHTML)
        }
    }
    win.dpr = v;
    // == 动态设置 html 节点的 font-size
    function resize() {
        var domWidth = domEle.getBoundingClientRect().width;
        if (domWidth / v > 540) {
            domWidth = 540 * v;
        }
        win.rem = domWidth / 7.5;
        domEle.style.fontSize = win.rem + "px";
    }
    win.addEventListener("resize", function() {
        clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
    }, false);
    win.addEventListener("pageshow", function(b) {
        b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
    }, false);
    resize();
}(window);
```

> 原理解析

``` text
当设计稿尺寸(设备物理分辨率)为 750px, 设备像素比 = 2, 缩放比 = 0.5 时;
则 device-width = 设备物理分辨率 = document.documentElement.clientWidth;

在 iPhone6 尺寸时, device-width / 7.5 = 100, 代表 1rem = 100px.
在 iPhone5 尺寸时, 640 / 7.5 = 85.34px, 代表 1rem = 85.34px.
```

## 响应式方案-flex

#### 容器的属性

```text
display:flex
flex-direction (默认为 row)
flex-wrap (默认为 no-wrap)
flex-flow
justify-content (默认为 flex-start)
align-items (默认为 stretch)
align-content
```

#### 项目的属性

```text
order (默认为 0)
flex-grow (默认为 0, 代表剩余空间不放大)
flex-shrink (默认为 1, 代表空间不足缩小)
flex-basis (默认为 auto, 代表项目原本大小)
flex (默认为 0 1 auto)
align-self
```

#### 注意项
```text
flex 为 none: 代表 0 0 auto;
flex 为 auto: 代表 1 1 auto;

flex 为一个非负数字: 代表 flex-grow 的值; 如 flex: 1 代表 flex: 1 1 0%
flex 为两个非负数字: 代表 flex-grow 和 flex-shrink 的值, flex-basis 为 0%

flex 为 px: 代表 flex-basis 的值; 如 flex: 10px 代表 flex: 1 1 10px;
flex 为  %: 代表 flex-basis 的值; 如 flex: 20% 代表 flex: 1 1 20%

flex 为一个非负数字和一个 px/%: 代表 flex-grow 和 flex-basis 的值, flex-shrink 为 1

注意:
1. 当 flex-basis 设置为 0% 时, 其声明的 width 即失效。
2. flex: 1 为什么会占满剩余全部: 其 flex-basis 为 0% , 则剩余空间 = 容器宽 - 其余项目 - 0%, 则剩余空间分配则会全部分给此 flex: 1 元素。
```

## 响应式方案-vw+vh

> vw、vh概念

```
1. 1vw 等于1/100的视口宽度 （Viewport Width）
2. 1vh 等于1/100的视口高度 （Viewport Height）

综上，一个页面而言，它的视窗的高度就是 100vh，宽度就是 100vw 。

响应式web设计离不开百分比。但是，CSS百分比并不是所有的问题的最佳解决方案。
CSS的宽度是相对于包含它的最近的父元素的宽度的。
但是如果你就想用视口（viewpoint）的宽度或者高度，而不是父元素的，这时候 vh 和 vw 单位就方便很多了。
```

> vmin、vmax概念

```
vh和 vw 依据于视口的高度和宽度，相对的，vmin 和 vmax则关于视口高度和宽度两者的最小或者最大值。

1. vmin — vmin的值是当前vw和vh中较小的值。
2. vmax — vw和vh中较大的值。

这个单位在横竖屏的切换中，十分有用。
在一些 Demo 示例，或者大页面中，我们经常都会看到上述 4 个单位的身影。灵活使用，就可以减少很多 CSS 的代码量。
```

## 响应式方案-grid

> grid 布局实战

```
grid 布局项目中使用的比较少，就不班门弄斧了。
这里有我自己写的一个案例: 横坐标是 12 个月, 每个月 4个星期; 纵坐标每个星期的 7 天。动态生成每个方格的颜色。
地址: https://github.com/yunaichun/animation-study/tree/master/Layout/5
```

## 参考资料

- [移动web开发之像素和DPR](https://www.cnblogs.com/xiaohuochai/p/5494624.html)
- [UI尺寸规范](https://tool.lanrentuku.com/guifan/ui.html)
- [茴字的四种写法—浅谈移动前端适配](https://mp.weixin.qq.com/s/nQ6qF2IxSP-JXYm6sNcV6Q)
- [从网易与淘宝的font-size思考前端设计稿与工作流](https://www.cnblogs.com/lyzg/p/4877277.html)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 详解](https://blog.csdn.net/fengyjch/article/details/79047908)
- [vh、vw、vmin、vmax 知多少](https://github.com/chokcoco/iCSS/issues/15)
- [CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
