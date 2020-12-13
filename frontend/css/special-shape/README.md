## 简介

> CSS 特殊形状学习笔记。

## CSS 等边三角形

```html
<style>
    .triangle{
        width: 0px;
        height: 0px;

        border-top: 0;
        border-bottom: 173.2px solid green;/* 100 * √3 */
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
    }
</style>
<div class="triangle">
</div>
```

## CSS 自适应正方形

> vw 单位

```html
<style>
     .parent{
        width: 100%;
        height: 100%;
        background-color: red;
    }
    .child{
        width: 50%;
        height: 50vw;
        background-color: black;
    }
</style>
<div class="parent">
    <div class="child">   
    </div>
</div>
```

> padding

```html
<style>
    .parent{
        width: 100%;
        height: 100%;
        background-color: red;
    }
    .child{
        width: 50%;
        height: 0; /*防止添加内容撑开高度*/
        padding-bottom: 50%;
        background-color: black;
    }
</style>
<div class="parent">
    <div class="child">
    </div>
</div>
```

> 伪元素 + padding

```html
<style>
    .parent{
        width: 50%;
        background-color: red;
    }
    .parent:after {
        content: '';
        display: block;
        padding-top: 100%; 
    }
</style>
<div class="parent">
</div>
```

> 伪元素 + BFC + margin

```html
<style>
    .parent{
        width: 50%;
        background-color: red;
        /*由于容器与伪元素在垂直方向发生了外边距折叠, 应对的方法是在父元素上触发 BFC */
        overflow: hidden; 
    }
    .parent:after {
        content: '';
        display: block;
        margin-top: 100%;
    }
</style>
<div class="parent">
</div>
```

## 参考资料

- [绘制三角形的三种方法](https://www.jianshu.com/p/b2eec4bcccaf)
- [CSS实现自适应的正方形](https://www.jianshu.com/p/da2826ca6c1a)
