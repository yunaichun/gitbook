## 简介

> React 简易实现-JSX的本质学习笔记。

## JSX是什么

```text
JSX 实质会被 react 的 createElement 方法解析；返回一个数据对象。

下面我们通过 @babel/plugin-transform-react-jsx 插件来看一下。

其作用是: 可以自定义解析 jsx 语法的函数名称。
```

## webpack 配置

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            // == 解析 jsx 语法的函数名称自定义为 createElementSimple
                            plugins: [[
                                '@babel/plugin-transform-react-jsx', 
                                {pragma: 'createElementSimple'}
                            ]]
                        },
                    },
                ]
            }
        ]
    },
};
```

## JSX 解析结果

```js
import React, { createElement as simpleCreateElement } from 'react';
import ReactDOM from 'react-dom';

// == jsx 语法会被 simpleCreateElement 函数解析成一个对象
const element1 = <h1 title="foo">Hello</h1>;
// console.log(11111, element1);

const container = document.getElementById('root');
ReactDOM.render(element1, container);
```

```text
上面 jsx 语法会被 simpleCreateElement 函数解析成一个对象，如下所示

{
  type: "h1",
  props: {
    title: "foo"
    children: "Hello"
  }
}
```

## simpleCreateElement 执行结果

```js
import React, { createElement as simpleCreateElement } from 'react';
import ReactDOM from 'react-dom';

// == 执行 simpleCreateElement 函数，传入 type、props、children 之后，返回一个对象
const element2 = simpleCreateElement(
  'h1',
  { title: 'foo' },
  'Hello'
);
// console.log(22222, element2);

const container = document.getElementById('root');
ReactDOM.render(element1, container);
```

```text
执行 simpleCreateElement 函数，传入 type、props、children 之后，返回一个对象，如下所示

{
  type: "h1",
  props: {
    title: "foo"
    children: "Hello"
  }
}
```

## JSX 本质

```text
上两步执行结果相同。由此可知 JSX 的本质是: 

1、执行 simpleCreateElement 函数

2、根据 dom 树结构传入 type、props、children 属性

3、返回 js 对象。
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
