## 简介

> CSS 水平垂直居中学习笔记。

## 定宽定高块状元素

> margin + line-height + text-align

```html
<style>
    .container{
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin:auto;
    }
</style>
<div class="container">
    hi!
</div>
```

## 不定宽高块状元素方法

> 绝对定位 + margin: auto

```html
<style>
    .container{
        position: relative;
        width: 100px;
        height: 100px;
    }
    .item {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 20px;
        height: 20px;
    }
</style>
<div class="container">
    <div class="item">
        hi!
    </div>
</div>
```

> 绝对定位 + transform

```html
<style>
    .container{
        position: relative;
        width: 100px;
        height: 100px;
    }
    .item{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);  
    }
</style>
<div class="container">
   <div class="item">hi</div>
</div>
```

> table 布局

```html
<style>
    .container{
        width: 100px;
        height: 100px;
        background:#ccc;
        display:table-cell;/*IE8以上及Chrome、Firefox*/
        vertical-align:middle;/*IE8以上及Chrome、Firefox*/
        text-align: center;
    }
</style>
<div class="container">
    <div>
        <p>hi!</p>
        <p>hi!</p>
        <p>hi!</p>
    </div>
</div>
```

> flex 布局

```html
<style>
    .container{
        display: flex;
        width: 100px;
        height: 100px;
        align-items: center;
        justify-content: center;
    }
</style>
<div class="container">
    <div class="item">
        hi!
    </div>
</div>
```

## 参考资料

[CSS-水平居中、垂直居中、水平垂直居中](https://segmentfault.com/a/1190000014116655)
