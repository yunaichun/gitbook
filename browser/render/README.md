## 简介

> 浏览器渲染过程学习笔记。

## DOCTYPE

> 什么是 DOCTYPE

```text
DTD (document type definition 文档类型定义) , 决定浏览器渲染引擎.

DOCTYPE 是用来定义当前文档类型和规范.
```

> DOCTYPE 的写法

```text
HTML5
<!DOCTYPE html>

HTML4.01严格模式(不包含废弃的模式)
<DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

HTML4.01传统模式
<DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" " http://www.w3.org/TR/html4/loose.dtd">
```

> 从输入URL到页面展示，这中间发生了什么？

```text
1. 搜索操作系统自身的 DNS 缓存.

2. 浏览器没有找到缓存或缓存已经失效，则发起一个 DNS 的系统调用：运营商服务器发起一个迭代 DNS 解析的请求，操作系统内核把结果返回浏览器.

3. 浏览器获得域名对应的 IP 地址后，发起 TCP "三次握手".

4. 服务端接收到了这个请求，根据路径参数，经过后端的一些处理之后，把处理后的数据返回给浏览器.比如返回完整的 HTML 页面代码给浏览器.

5. 浏览器根据拿到的资源对页面进行渲染，最终把一个完整的页面呈现给用户.
```

## HTML、CSS 和 JavaScript，是如何变成页面的？

```text
1. 构建 DOM 树

2. 构建样式树 (样式计算)
把 CSS 转换为浏览器能够理解的结构: 将 CSS 转换成 StyleSheets，document.styleSheets。

转换样式表中的属性值，使其标准化: CSS 单位统一

计算出 DOM 树中每个节点的具体样式: CSS 继承规则层叠规则

3. 构建布局和图层树 (布局阶段)
创建布局树: 只含可见元素。布局树创建完成之后进行布局计算。

布局计算: 分层，创建图层树。拥有层叠上下文属性的元素会被提升为单独的一层；需要剪裁(clip)的地方也会被创建为图层。

4. 渲染引擎: 执行图层绘制。 (主进程)

5. 浏览器进程: 完成合成和显示。 (非主进程)
```

## 重排和重绘

#### 重排 (更新了元素的几何属性)

```
重排会使浏览器触发重新布局；
重排需要更新完整的渲染流水线，所以开销是很大的。

哪些操作会造成重排: 

1. 添加、删除和修改 DOM 节点

2. 移动 DOM 位置，或者弄个动画

3. 修改CSS样式: 修改宽高、display、visible

4. resize 窗口
```

#### 重绘 (更新了元素的绘制属性)

```
重绘省去了构建布局和图层树，直接进入渲染引擎绘制图层阶段，所以执行效率会比重排操作要高一些。

哪些操作会造成重排: 修改元素背景颜色等。
```

#### CSS3 transform

```
CSS3 transform 省去了构建布局和图层树和渲染引擎绘制图层阶段（避开重绘和重排），直接在浏览器进程（非主进程）执行动画合成操作。

这样的效率是最高的，因为没有占用主进程，同时会跳过布局和绘制阶段。
```

## 参考资料

- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)
- [How browsers work](https://web.dev/howbrowserswork/)
- [What really happens when you navigate to a URL](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)
- [Chrome 浏览器架构](https://xie.infoq.cn/article/5d36d123bfd1c56688e125ad3)
