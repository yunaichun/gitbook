## 简介

> React 简易实现-Render and Commit Phases学习笔记。

## 上一节存在问题

```js
function performUnitOfWork() {
  // ...
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // ...
}
```

```text
每次处理一个元素时, 我们都会向页面 DOM 添加一个新节点。

而且, 在完成渲染整个树之前, 浏览器可能会中断我们的工作。在这种情况下, 用户将看到不完整的 UI。
```

## 解决思路

```
1、不在 performUnitOfWork 每次断续执行 dom 的添加工作

2、在所有 Fiber 节点串联成 Fiber 树之后再进行 dom 添加操作
```

## 解决方案

#### performUnitOfWork 移除 dom 添加

```js
/** 3. 每个工作单元任务 */
function performUnitOfWork(fiber) {
  /** 创建当前节点的 DOM 并添加到父节点 */
  if (!fiber.dom) fiber.dom = createDom(fiber);
  /** 不是每次空闲的时候添加至页面, 最后一一次性添加至页面 */
  // if (fiber.parent) fiber.parent.dom.appendChild(fiber.dom);
  /** 为元素的子节点创建 Fiber 节点 */
  buildChildFibers(fiber);
  /** 选择下一个工作单元 */
  return getNextFiber(fiber);
}

function createDom(fiber) {
  const { type, props } = fiber;
  let dom;
  if (type === 'TEXT_ELEMENT') dom = document.createTextNode('');
  else dom = document.createElement(type);

  for (let key in props) {
    if (key !== 'children') dom[key] = props[key];
  }
  return dom;
}

function buildChildFibers (fiber) {
  const { children } = fiber.props;
  let index = 0;
  let prevSibling = null;
  while (index < children.length) {
    const childJxsRes = children[index];
    const { type, props } = childJxsRes;
    let newFiber = {
      type,
      props,
      dom: null,
      parent: null,
      child: null,
      sibling: null
    };
    newFiber.parent = fiber;
    if (index === 0) fiber.child = newFiber;
    else prevSibling.sibling = newFiber;
    prevSibling = newFiber;
    index += 1;
  }
}

function getNextFiber (fiber) {
  /** 1、子节点 */
  if (fiber.child) return fiber.child;
  let nextFiber = fiber;
  while (nextFiber) {
    /** 2、兄弟节点 */
    if (nextFiber.sibling) return nextFiber.sibling;
    /** 3、父节点 */
    nextFiber = nextFiber.parent;
  }
}
```


#### 备份 Fiber 树的根节点

```js
/** 1. 设置工作单元 */
let nextUnitOfWork = null;
let wipRoot = null;
export default function render(jsxRes, container) {
  /** 初始 render 备份 Fiber 树的根节点: 称其为进行中的 Fiber 节点 */
  wipRoot = {
    props: {
      children: [jsxRes],
    },
    dom: container,
    parent: null,
    child: null,
    sibling: null,
  };
  /** 当前工作单元: 将 nextUnitOfWork 设置为 Fiber 树的根节点 */
  nextUnitOfWork = wipRoot;
}
```

#### workLoop 里执行创建 dom

```js
/** 2. 开始工作循环 */
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    /** deadline 有 2 个参数: timeRemaining() - 当前帧还剩下多少时间; didTimeout - 是否超时 */
    shouldYield = deadline.timeRemaining() < 1;
  }
  /** 一旦完成所有工作（因为没有下一个工作单元，我们就知道了），我们便将整个 Fiber 树提交到 DOM 节点上 */
  if (!nextUnitOfWork && wipRoot) commitRoot();

  requestIdleCallback(workLoop);
}
/** 浏览器将在主线程空闲时运行 workLoop 回调, 其次在未来的帧中继续执行 */
requestIdleCallback(workLoop);
```

#### commitRoot 提交 dom

```js
/** 最终会遍历到根节点, 此时 nextUnitOfWork 为 null */
function commitRoot() {
  /** wipRoot.child 代表 Fiber 树的第一个子节点 */
  commitWork(wipRoot.child);
  /** 添加到 DOM 节点之后将 wipRoot 重置为空，为下一次更新初始化变量 */
  wipRoot = null;
}
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
