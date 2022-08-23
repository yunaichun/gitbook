## 简介

> CSS 选择器学习笔记。

## 选择器种类

```text
1. 元素选择器
2. 分组选择器（逗号分隔）  
3. 类选择器
4. id选择器
5. 属性选择器（是否具有属性、属性值为此的元素）
7. 后代选择器（空格）
7. 子选择器（>）  
8. 相邻兄弟选择器（+）
9. 伪类
10. 伪元素
```

#### 属性选择器详解

```text
[attribute]用于选取带有指定属性的元素。
[attribute=value]用于选取带有指定属性和值的元素。
[attribute~=value]用于选取属性值中包含指定词汇的元素。
[attribute|=value]用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。
[attribute^=value]匹配属性值以指定值开头的每个元素。
[attribute$=value]匹配属性值以指定值结尾的每个元素。
[attribute*=value]匹配属性值中包含指定值的每个元素。
```

## 伪元素

> 伪元素则创建了一个文档数外的元素。

```text
::before         在元素之前添加内容。
::after          在元素之后添加内容。
::first-letter   向文本的第一个字母添加特殊样式。（块级元素）
::first-line     向文本的首行添加特殊样式。（块级元素）
```

## 伪类

> 伪类的操作对象是文档树中已有的元素。

```text
:link             向未被访问的链接添加样式。
:visited          向已被访问的链接添加样式。
:hover            当鼠标悬浮在元素上方时，向元素添加样式。
:active           向被激活的元素添加样式。
:focus            向拥有键盘输入焦点的元素添加样式。

:first-child      div p:first-child 指的是div最后一个子元素，还必须是p元素
:last-child

:nth-child        div p:nth-child(1) 指的是div第一个元素，还必须是p元素(括号中也可以写成表达式，如选择偶数2n，也可以写单词偶数even、奇数odd)
:nth-of-type      div p:nth-of-type(1) 指的是div下p子元素中的第1个p元素
:nth-last-child
:nth-last-of-type

:only-child       唯一子元素
:only-type-child  唯一特定类型子元素

:empty            匹配没有子元素的元素
:not              li:not(.first-item)指的是li标签中不是.first-item的类的元素
```

## 清除浮动

> 利用伪元素清除浮动。

```html
<style>
    .clearfix:before,
    .clearfix:after{
        content: "";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both; 
    }
    .clearfix{
        zoom: 1;/*ie6、7兼容*/
    }
    .float {
        float: left;
    }
</style>
<div class="container clearfix">
    <div class="item">
        hi
    </div>
</div>
```

## 参考资料

- [总结伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)
