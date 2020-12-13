## 简介

> CSS BFC 学习笔记。

## CSS 盒模型

#### CSS 盒模型基本概念

```text
1、标准模型(content不包括border和padding)
2、IE模型(content包括border和padding)
```

#### CSS如何设置这两种模型

```text
1、标准模型(box-sizing: content-box)
2、IE模型(box-sizing: border-box)
```

#### JS 如何设置获取盒模型对应的宽和高

```text
1、dom.style.width：只能获取内联样式设置的宽高（外联样式和内部样式获取不到）
2、dom.currentStyle.width：三种方式引入样式渲染之后的宽高（只有IE支持）
3、window.getComputedStyle(dom).width：三种方式引入样式渲染之后的宽高（兼容chrom和firefox）
4、dom.getBoundingClientRect().width(相对视口的绝对位置： width、height、left、top)
```

## BFC

#### BFC基本概念

```text
块级格式化上下文，它是指一个独立的块级渲染区域。对应于IFC（内联格式化上下文）
```

#### BFC原理（即渲染规则）

```text
1、同一个 BFC 下边距会发生重叠
2、BFC 区域会包含浮动的元素（清除浮动）
3、BFC 可以阻止元素被浮动元素覆盖（解决文字环绕）
```

#### 如何创建BFC

```text
1、body 根元素
2、float值不为none；
3、overflow的值不为visible；
4、position的值不为static和relative；
5、display的值为inline-block、table-cell、table-caption、table；
```

#### BFC使用场景

###### 1. 同一个 BFC 下外边距会发生折叠

> 同一个 BFC 下外边距会发生折叠

```html
<style>
    div{
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
    }
</style>
<body>
    <div></div>
    <div></div>
</body>
```

> 避免外边距的重叠，可以将其放在不同的 BFC 容器中。

```html
<style>
    .container {
        overflow: hidden;
    }
    p {
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
    }
</style>
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```

##### 2. BFC 区域会包含浮动的元素（清除浮动）

> 未触发 BFC , 不会包裹浮动元素

```html
<style>
    .container {
        border: 1px solid #000;
    }
    p {
        width: 100px;
        height: 100px;
        background: #eee;
        float: left;
    }
</style>
<div class="container">
    <p></p>
</div>
```

> 触发 BFC , 会包裹浮动元素

```html
<style>
    .container {
        border: 1px solid #000;
        overflow: hidden;
    }
    p {
        width: 100px;
        height: 100px;
        background: #eee;
        float: left;
    }
</style>
<div class="container">
    <p></p>
</div>
```

##### 3. BFC 可以阻止元素被浮动元素覆盖（解决文字环绕）

> 未触发 BFC , 导致文字环绕
**浮动基本原理, 左右没有遮挡物, 会到左侧**

```html
<style>
    .left {
        height: 100px;
        width: 100px;
        float: left;
        background: lightblue;
    }
    .right {
        width: 200px;
        height: 200px;
        background: #eee;
    }
</style>
<div class="left">
    我是一个左浮动的元素
</div>
<div class="right">
    我是一个没有设置浮动, 也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;
</div>
```

> 触发 BFC , 不会导致文字环绕

```html
<style>
    .left {
        height: 100px;
        width: 100px;
        float: left;
        background: lightblue;
    }
    .right {
        width: 200px;
        height: 200px;
        background: #eee;
        overflow: hidden;
    }
</style>
<div class="left">
    我是一个左浮动的元素
</div>
<div class="right">
    我是一个没有设置浮动, 触发 BFC 元素, width: 200px; height:200px; background: #eee;overflow: hidden;
</div>
```

## 参考资料

- [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
