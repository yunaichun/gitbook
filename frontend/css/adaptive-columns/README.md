## 简介

> CSS 自适应多列布局学习笔记。

## CSS 自适应两列布局

#### float 布局

```html
<style media="screen">
    .layout.float .left{
        float:left;
        width:300px;
        background: red;
    }
    .layout.float .right{
        background: yellow;
    }
</style>
<section class="layout float">
    <h1>二栏布局</h1>
    <article class="left-right">
        <div class="left"></div>
        <div class="right">
            <h2>浮动解决方案</h2>
            1.这是二栏布局的浮动解决方案；
            2.这是二栏布局的浮动解决方案；
            3.这是二栏布局的浮动解决方案；
        </div>
    </article>
</section>
```

```text
优点：兼容性比较好
缺点：脱离文档流，清除浮动不做好，会带来很大的影响
```

#### absolute 布局

```html
<style>
    .layout.absolute .left-right>div{
        position: absolute;
    }
    .layout.absolute .left{
        left:0;
        width: 300px;
        background: red;
    }
    .layout.absolute .right{
        left: 300px;
        right: 0;
        background: yellow;
    }
</style>
<section class="layout absolute">
    <h1>二栏布局</h1>
    <article class="left-right">
        <div class="left"></div>
        <div class="right">
            <h2>绝对定位解决方案</h2>
            1.这是二栏布局的绝对定位解决方案；
            2.这是二栏布局的绝对定位解决方案；
            3.这是二栏布局的绝对定位解决方案；
        </div>
    </article>
</section>
```

```text
优点：快捷
缺点：子元素一起脱离文档流，有效性和使用性比较差
```

#### flex 布局

```html
<style>
    .layout.flexbox .left-right{
        display: flex;
    }
    .layout.flexbox .left{
        width: 300px;
        background: red;
    }
    .layout.flexbox .right{
        flex: 1;
        background: yellow;
    }
</style>
<section class="layout flexbox">
    <h1>二栏布局</h1>
    <article class="left-right">
        <div class="left"></div>
        <div class="right">
            <h2>flexbox解决方案</h2>
            1.这是二栏布局的flexbox解决方案；
            2.这是二栏布局的flexbox解决方案；
            3.这是二栏布局的flexbox解决方案；
        </div>
    </article>
</section>
```

```text
优点：CSS3的新布局，解决上述两个布局的缺陷。
缺点：兼容性到IE11
```

#### table 布局

```html
<style>
    .layout.table .left-right{
        width:100%;
        height: 100px;
        display: table;
    }
    .layout.table .left-right>div{
        display: table-cell;
    }
    .layout.table .left{
        width: 300px;
        background: red;
    }
    .layout.table .right{
        background: yellow;
    }
</style>
<section class="layout table">
    <h1>二栏布局</h1>
    <article class="left-right">
        <div class="left"></div>
        <div class="right">
            <h2>表格布局解决方案</h2>
            1.这是二栏布局的表格布局解决方案；
            2.这是二栏布局的表格布局解决方案；
            3.这是二栏布局的表格布局解决方案；
        </div>
    </article>
</section>
```

```text
优点：轻易实现，兼容性到IE11
缺点：某个单元格高度超出，其余单元格都需要调整高度
```

#### grid 布局

```html
<style>
    .layout.grid .left-right{
        width:100%;
        display: grid;
        grid-template-rows: 300px;
        grid-template-columns: 300px auto;
    }
    .layout.grid .left{
        width: 300px;
        background: red;
    }
    .layout.grid .right{
        background: yellow;
    }
</style>
<section class="layout grid">
    <h1>二栏布局</h1>
    <article class="left-right">
        <div class="left"></div>
        <div class="right">
            <h2>网格布局解决方案</h2>
            1.这是二栏布局的网格布局解决方案；
            2.这是二栏布局的网格布局解决方案；
            3.这是二栏布局的网格布局解决方案；
        </div>
    </article>
</section>
```

```text
优点：轻易实现，兼容性到IE11
缺点：某个单元格高度超出，其余单元格都需要调整高度
```

## CSS 自适应三列布局

### float 布局

```html
<style>
    .main{
        height:100%;
        margin:0 200px;
        background:#ffe6b8;
    }
    .left, .right{
        width:200px;
        height:100%;
        background:#a0b3d6;
    }
    .left{
        float:left;
    }
    .right{
        float:right;
    }
</style>
<div class="left"></div>
<div class="right"></div>
<div class="main"></div>
```

### absolute 布局

```html
<style>
    html,body{margin:0; height:100%;}
    .main{
        margin:0 200px;
        background:#ffe6b8;
        height:100%;
    }
    .left, .right{
        position:absolute;
        top:0;
        width:200px;
        height:100%;
    }
    .left{
        left:0;
        background:#a0b3d6;
    }
    .right{
        right:0;
        background:#a0b3d6;
    }
</style>
<div class="left"></div>
<div class="main"></div>
<div class="right"></div>
```

### margin负值法

```html
<style>
    .main{
        width:100%;
        height:100%;
        float:left;
    }
    .main .body{
        margin:0 200px;
        background:#ffe6b8;
        height:100%;
    }
    .left, .right{
        width:200px;
        height:100%;
        float:left;
        background:#a0b3d6;
    }
    .left{
        margin-left:-100%;
    }
    .right{
        margin-left:-200px;
    }
</style>
<div class="main">
	<div class="body"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

```text
优点：三栏相互关联，可谓真正意义上的自适应，有一定的抗性——布局不易受内部影响。
缺点：相对比较难理解些，上手不容易，代码相对复杂。出现百分比宽度，过多的负值定位，如果出现布局的bug，排查不易。
```

> 其余参考两列自适应布局方法。

## 参考资料

[css布局 - 两栏自适应布局的几种实现方法汇总](https://cloud.tencent.com/developer/article/1393337)

[我熟知的三种三栏网页宽度自适应布局方法](https://www.zhangxinxu.com/wordpress/2009/11/我熟知的三种三栏网页宽度自适应布局方法)
