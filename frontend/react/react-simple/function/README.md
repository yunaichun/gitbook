## 简介

> React 简易实现-函数组件学习笔记。

## 函数组件的本质

> 先看一个函数组件的渲染

```text
function App(props) {
  return <h1>Hi {props.name}</h1>;
}

const element = <App name="foo" />;
const container = document.getElementById('root');
render(element, container);
```

> 函数组件 Fiber 节点的 type 属性是什么

```text
1、函数组件 Fiber 节点的 type 属性函数本身

2、则执行此函数即 fiber.type(fiber.props) 会返回当前函数组件的实际的节点树，

3、如下
function App(props) {
  return <h1>Hi {props.name}</h1>;
}
等价于
function App(props) {
  return createElement(
    "h1",
    null,
    "Hi ",
    props.name
  )
}
```

## 解决思路

```text
1、在 performUnitOfWork 阶段如果遇到 type 为 function 的节点，执行 type 函数拿到真实的 childern

2、commitRoot 阶段添加元素：
  - 如果父级 fiber 节点没有 dom 属性，即为函数组件，则找父级节点的父级节点
  - 如果待移除的 fiber 节点没有 dom 属性，即为函数组件，则找子节点
```

## 解决方案

#### performUnitOfWork 节点处理 fiber.type 为 function 的节点

```js
/** 3. 每个工作单元任务 */
function performUnitOfWork(fiber) {
  const { type } = fiber;
  const isFunctionComponent = type instanceof Function;
  /** 函数组件的子节点没有 dom */
  if (isFunctionComponent) fiber.props.children = [type(fiber.props)];
  /** 创建当前节点的 DOM 并添加到父节点 */
  else if (!fiber.dom) fiber.dom = createDom(fiber);
  /** 为元素的子节点创建 Fiber 节点, 添加了调和的过程 */
  reconcileChildren(fiber);
  /** 选择下一个工作单元 */
  return getNextFiber(fiber);
}
```

#### commitRoot 节点处理 type 为 function 的节点

```js
function commitWork(fiber) {
  if (!fiber) return;
  /** 1. 将子节点添加到 container */
  if (fiber.dom !== null) {
    /** const domParent = fiber.parent.dom; */
    /** 向上递归查找父节点 */
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) domParentFiber = domParentFiber.parent;
    const domParent = domParentFiber.dom;
    /** 向下递归删除子节点 */
    function commitDeletion(fiber, domParent) {
      if (fiber.dom) domParent.removeChild(fiber.dom);
      else commitDeletion(fiber.child, domParent);
    }
    if (fiber.effectTag === 'PLACEMENT') domParent.appendChild(fiber.dom);
    else if (fiber.effectTag === 'UPDATE') updateDomPropps(fiber.dom, fiber.alternate.props, fiber.props);
    else if (fiber.effectTag === 'DELETION') commitDeletion(fiber, domParent);
  }
  /** 2. 递归执行子节点 */
  commitWork(fiber.child);
  /** 3. 递归执行右兄弟节点 */
  commitWork(fiber.sibling);
}
```

#### 开始render

```js
function App(props) {
  return <h1>Hi {props.name}</h1>;
}
const element = <App name="foo" />;
const container = document.getElementById('root');
render(element, container);
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
