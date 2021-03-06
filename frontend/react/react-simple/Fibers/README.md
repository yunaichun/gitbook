## 简介

> React 简易实现-Fibers学习笔记。

## 渲染拆分

```
根据上一节 Concurrent Mode 的介绍，

我们可以利用浏览器的 requestIdleCallback 方法将页面渲染拆分成一个个任务，

放在浏览器空闲的时候执行；具体思路如下。
```

## 逻辑梳理

#### 设置工作单元

```text
要开始使用循环, 我们需要设置第一个工作单元, 

然后编写一个 performUnitOfWork 函数,

该函数不仅执行当前工作单元, 同时返回下一个工作单元. 
```

#### 组织工作单元

```text
要组织工作单元, 我们需要一个数据结构: 一棵 Fiber 树. 

我们将为每个元素分配一个 Fiber 节点, 

并且每一个 Fiber 节点将成为一个工作单元. 
```

#### 每个工作单元任务

```js
// == 3. 假设我们要渲染一个像这样的元素树: 
render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
)
```

```text
在渲染中, 我们将创建 root Fiber 节点并将其设置为 nextUnitOfWork . 剩下的工作将在 performUnitOfWork 函数上进行.

performUnitOfWork 中我们将为每个 Fiber 节点做三件事: 

1. 将元素添加到 DOM 

2. 为元素的子节点创建 Fiber 节点

3. 选择下一个工作单元

第一: 如果 Fiber 节点没有子节点, 我们将右兄弟节点作为下一个工作单元.
例如, p 元素 Fiber 节点没有子节点, 因此我们将移至 a 元素的 Fiber 节点. 

第二: 如果 Fiber 节点既没有子节点也没有右兄弟节点, 那么我们移至父节点.
例如, a 和 h2 元素的 Fiber 节点. 

第三: 如果父节点没有右兄弟节点, 我们会不断向上检查, 直到找到有兄弟姐妹的父节点或者直到找到根节点.
如果到根节点, 则意味着我们已经完成了此渲染的所有工作. 

该数据结构的目标之一是使查找下一个工作单元变得容易. 
这就是为什么每个 Fiber 节点都链接到其第一个子节点, 下一个兄弟姐妹和父节点.
```

## 代码实现

#### 设置工作单元

```js
// == 在渲染函数中, 将 nextUnitOfWork 设置为 Fiber 树的根节点
let nextUnitOfWork = null;
export default function render(element, container) {
  // == 当前工作单元: 根 Fiber 节点
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}
```

#### 开始工作循环

```js
// == 然后, 当浏览器准备就绪时, 它将调用我们的 workLoop, 我们将开始在 Fiber 树的根节点上工作
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    // == deadline 有 2 个参数: timeRemaining() - 当前帧还剩下多少时间; didTimeout - 是否超时
    shouldYield = deadline.timeRemaining() < 1;
  }
  // == 在未来的帧中继续执行
  requestIdleCallback(workLoop);
}
// == 浏览器将在主线程空闲时运行 workLoop 回调
requestIdleCallback(workLoop);
```

#### 每个工作单元任务

```js
// == 作用: 不仅执行当前工作单元, 同时返回下一个工作单元
function performUnitOfWork(fiber) {
  // add dom node
  // create new fibers
  // return next unit of work

  // == 1. 首先, 我们创建一个新节点并将其附加到DOM. 
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // == 每次处理一个元素时, 我们都会向页面 DOM 添加一个新节点。而且, 在完成渲染整个树之前, 浏览器可能会中断我们的工作。在这种情况下, 用户将看到不完整的 UI
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // == 2. 然后, 为每个子节点创建一个 Fiber 节点
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // == 将其添加到 Fiber 树中, 将其设置为子节点还是同级节点, 具体取决于它是否是第一个子节点
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // == 3. 最后, 搜索下一个工作单元: 首先子节点 -> 然后右兄弟节点 -> 最后父节点. 依此类推
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

// == 创建 DOM 节点
function createDom(fiber) {
  const dom =
    fiber.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  
  const isProperty = key => key !== 'children';
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    });
  
  return dom;
}
```

#### 开始render

```js
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById('root');
render(element, container);
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
