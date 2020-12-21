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
1、在 performUnitOfWork 阶段如果遇到 fiber.type 为 function 的节点，执行 fiber.type 函数等到真实的 childern

2、commitRoot 阶段添加元素：如果父级 fiber 节点没有 dom 属性，即为函数组件，则找父级节点的父级节点

3、commitRoot 阶段删除元素：如果待移除的 fiber 节点没有 dom 属性，即为函数组件，则找待移除节点的子节点
```

## 解决方案

#### performUnitOfWork 节点处理 fiber.type 为 function 的节点

```js
// == 3. 每个工作单元任务
// == 作用: 不仅执行当前工作单元, 同时返回下一个工作单元
function performUnitOfWork(fiber) {
  // add dom node
  // create new fibers
  // return next unit of work

  // == 1. 首先, 我们创建一个新节点
  const isFunctionComponent =
    fiber.type instanceof Function;
  // == 2. 通过 reconcileChildren 函数来创建新的 Fiber 树
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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

function updateFunctionComponent(fiber) {
  // == 执行此函数组件: fiber.type() -> createElement() -> js 对象【和 fiber.props.children 一致】
  // == 区别是函数组件没有 dom 等属性, 同时经过 createElement 解析之后 type 为 Function【实际是此函数组件本身】
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // == 2. 通过 reconcileChildren 函数来创建新的 Fiber 树
  // == 2.1：分析根 Fiber 节点的第一个子节点渲染
  // == 此处的 elements 是【根 Fiber 节点的第一个子节点（babel解析后的）】数据
  // == 此处的 fiber.alternate.child 是首次渲染时【根 Fiber 节点的第一个子节点的备份】
  // == 2.2：假如第一个子节点是修改状态，在 reconcileChildren 阶段即存入 alternate 备份，进行第一步同样的比较逻辑
  reconcileChildren(fiber, fiber.props.children);
}

// == 在这里，我们将旧 Fiber 树与新 Fiber 树进行协调. 同时遍历旧 Fiber 树的子级（wipFiber.alternate.child）和要调和的元素数组
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber =
    wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (
    index < elements.length ||
    oldFiber != null
  ) {
    const element = elements[index];
    let newFiber = null;
    // == 我们需要对它们进行比较，以了解是否需要对 DOM 进行任何更改
    // == 1. 如果 type 不同并且有一个新元素, 则意味着我们需要创建一个新的 DOM 节点
    // == 2. 如果旧 Fiber 树与新 Fiber 树具有相同的 type , 我们可以保留 DOM 节点, 仅更新 props
    // == 3. 如果 type 不同且有旧 Fiber 树, 则需要删除旧节点
    // == 4. React 也使用 key 属性, 这样可以实现更好的协调. 例如, 它检测子元素何时更改元素数组中的位置
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type;
    
    if (!sameType && element) {
      // TODO add this node
      newFiber = {
        type: element.type,
        props: element.props,
        parent: wipFiber,
        dom: null,
        // == 初始添加的时候 alternate 均为 null
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }

    if (sameType) {
      // TODO update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        parent: wipFiber,
        dom: oldFiber.dom,
        // == 更新的时候每个 Fiber 节点都保存上一次 Fiber 节点的数据: 先在 reconcileChildren 阶段将每个 Fiber 节点通过 alternate 属性存储上, 然后在 commitRoot 阶段对比后才去真正执行 DOM 操作
        alternate: oldFiber,
        // == 我们将在提交阶段使用此属性
        effectTag: 'UPDATE',
      };
    }
    
    if (!sameType && oldFiber) {
      // TODO delete the oldFiber's node
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    // == 到下一次判断的时候使用
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // == 将其添加到 Fiber 树中, 将其设置为子节点还是同级节点, 具体取决于它是否是第一个子节点
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
```

#### commitRoot 节点处理 fiber.type 为 function 的节点

```js
// == 一旦完成所有工作（因为没有下一个工作单元，我们就知道了），我们便将整个 Fiber 树提交给 DOM
// == 我们在 commitRoot 函数中做到这一点。在这里，我们将所有节点递归附加到 dom
function commitRoot() {
  // == 删除 dom 操作单独执行
  deletions.forEach(commitWork);
  // == wipRoot.child 代表 Fiber 树的第一个子节点
  commitWork(wipRoot.child);
  // == 保存上一次构建的 Fiber 树数据结构, 在下一次重新渲染时候会用到: 先在 reconcileChildren 阶段将每个 Fiber 节点通过 alternate 属性存储上, 然后在 commitRoot 对比后才去真正执行 DOM 操作
  currentRoot = wipRoot;
  console.log(333333, currentRoot);
  // == 添加到 DOM 节点之后将 Fiber 树销毁
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // == 1. 将子节点添加到 container
  // == 因为函数组件在 performUnitOfWork 阶段是没有创建 dom 属性的
  // == 首先，要找到 DOM 节点的父节点, 我们需要沿着 Fiber 树向上移动，直到找到带有 DOM 节点的 Fiber
  // const domParent = fiber.parent.dom;
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (
    fiber.effectTag === 'PLACEMENT' &&
    fiber.dom != null
  ) {
    // TODO add this node
    domParent.appendChild(fiber.dom);
  } else if (
    fiber.effectTag === 'UPDATE' &&
    fiber.dom != null
  ) {
    // TODO update the node
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    );
  } else if (fiber.effectTag === 'DELETION') {
    // TODO delete the oldFiber's node
    // domParent.removeChild(fiber.dom);
    // == 在删除节点时，我们还需要继续操作，直到找到具有 DOM 节点的子节点为止
    commitDeletion(fiber, domParent);
  } 
  // == 2. 递归执行子节点
  commitWork(fiber.child);
  // == 3. 递归执行右兄弟节点
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    // == 在删除节点时, 我们还需要继续操作, 直到找到带有 DOM 节点的子节点为止
    commitDeletion(fiber.child, domParent);
  }
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
