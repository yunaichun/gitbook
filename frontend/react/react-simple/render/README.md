## 简介

> React 简易实现-render学习笔记。

## render 函数是什么

```text
作用: 
根据 createElementSimple 创建的 js 对象创建元素，并渲染到 container 元素上

内部逻辑: 
1. 创建 元素节点 或者 文本节点

2. 递归创建每个子节点

3. 为当前节点添加属性

4. 将创建的节点添加至容器
```

## render 函数实现

```js
/** 根据 createElementSimple 创建的 js 对象创建元素；并渲染到 container 元素上 */
export default function render(jsxRes, container) {
  const { type, props } = jsxRes;
  console.log(3, type, props);
  let dom;
  if (type === 'TEXT_ELEMENT') dom = document.createElement(type);
  else dom = document.createTextNode('');
  for (let key in props) {
    /** 添加属性 */
    if (key !== 'children') dom[key] = props[key];
    /** 处理 children */
    else props.children.map(child => render(child, dom));
  }
  container.appendChild(dom);
}
```

## 存在问题

```text
上述代码第二步递归调用存在以下问题:

1、开始渲染后，直到渲染完完整的元素树后，我们才会停止。如果元素树很大，则可能会阻塞主线程太长时间。

2、而且，如果浏览器需要执行高优先级的操作（例如处理用户输入或保持动画流畅），则它必须等到渲染完成为止。
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
