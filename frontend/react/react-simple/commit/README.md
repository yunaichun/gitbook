## 简介

> React 简易实现-commit学习笔记。

## 存在缺陷

```js
function performUnitOfWork() {
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
    }
}
```

```text
每次处理一个元素时, 我们都会向页面 DOM 添加一个新节点。

而且, 在完成渲染整个树之前, 浏览器可能会中断我们的工作。

在这种情况下, 用户将看到不完整的 UI。
```

## 解决思路

```
1、不在 performUnitOfWork 每次断续执行 dom 的添加工作

2、在所有 Fiber 节点串联成 Fiber 树之后再进行 dom 添加操作
```

## 解决方案

#### performUnitOfWork 移除 dom 添加

```js
function performUnitOfWork(fiber) {
  // add dom node
  // create new fibers
  // return next unit of work

  // == 1. 首先, 我们创建一个新节点并将其附加到DOM. 
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // == 每次处理一个元素时, 我们都会向页面 DOM 添加一个新节点。而且, 在完成渲染整个树之前, 浏览器可能会中断我们的工作。在这种情况下, 用户将看到不完整的 UI。
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }

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
```


#### 备份 Fiber 树的根节点

```js
// == 在渲染函数中, 将 nextUnitOfWork 设置为 Fiber 树的根节点
let nextUnitOfWork = null;
// == 备份 Fiber 树的根节点: 称其为进行中的 Fiber 节点
let wipRoot = null;
export default function render(element, container) {
  // == 当前工作单元: 根 Fiber 节点
  wipRoot = {
    props: {
      children: [element],
    },
    dom: container,
  };
  nextUnitOfWork = wipRoot;
}
```

#### workLoop 里执行创建 dom

```
1、初始化的时候 wipRoot 为 null，不会提交 commit

2、render 里面初始设置 nextUnitOfWork 之后 wipRoot 也已经有值了，但是此时 nextUnitOfWork 不为 null, 也不会提交 commit

3、当没有下一个工作单元的时候，即所有 Fiber 节点均已构建完成，此时会提交 commit

4、提交 commit 完成后 wipRoot 为 null，也不会再提交 commit 了，会等待下一次调用 render 的时候了
```

```js
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    // == deadline 有 2 个参数: timeRemaining() - 当前帧还剩下多少时间; didTimeout - 是否超时
    shouldYield = deadline.timeRemaining() < 1;
  }

  // == 一旦完成所有工作（因为没有下一个工作单元，我们就知道了），我们便将整个 Fiber 树提交到 DOM 节点上
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  // == 在未来的帧中继续执行
  requestIdleCallback(workLoop);
}
```

#### commitRoot 提交 dom

```js
function commitRoot() {
  // == wipRoot.child 代表 Fiber 树的第一个子节点
  commitWork(wipRoot.child);
  // == 添加到 DOM 节点之后将 wipRoot 重置为空，为下一次更新初始化变量
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // == 1. 将子节点添加到 container
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  // == 2. 递归执行子节点
  commitWork(fiber.child);
  // == 3. 递归执行右兄弟节点
  commitWork(fiber.sibling);
}
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
