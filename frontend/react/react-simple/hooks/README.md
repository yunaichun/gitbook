## 简介

> React 简易实现-Hooks学习笔记。

## 函数组件回顾

```text
1、函数组件 Fiber 节点的 type 属性为函数本身

2、则执行此函数即 fiber.type(fiber.props) 会返回当前函数组件的实际的 jsx

3、假如在函数组件内部执行 useState 函数，则当执行此函数组件时（即 fiber.type(fiber.props) 时），则 useState 也会被执行
```

## useState 实现思路

```text
1、函数组件 Fiber 节点添加 hooks 属性
{
  type: Function,
  hooks: { 
    state,
    queue: [] 
  }
}

2、执行 setState 函数则会收集 action 之后便重置工作单元

3、当工作单元到再次达此函数组件的时候, 便会执行收集的 action
```

## useState 实现方案

#### 函数组件 Fiber 节点添加 hooks 属性

```js
/** 3. 每个工作单元任务 */
/** 设置进行构建中的子 Fiber 节点: 函数组件 Fiber 节点添加 hooks 属性 */
let wipFiber = null;
/** Fiber 树中添加 hooks 数组: 支持在同一组件中多次调用 useState , 并且我们跟踪当前 hook 索引 */
let hookIndex = null;
function performUnitOfWork(fiber) {
  const { type } = fiber;
  const isFunctionComponent = type instanceof Function;
  if (isFunctionComponent) {
    /** 此处是引用传递，也会把 hooks 属性挂载到 fiber 上 */
    wipFiber = fiber;
    wipFiber.hooks = [];
    hookIndex = 0;
    /** 函数组件的子节点没有 dom */
    fiber.props.children = [type(fiber.props)];
  } else if (!fiber.dom) {
    /** 创建当前节点的 DOM 并添加到父节点 */
    fiber.dom = createDom(fiber);
  }
  /** 为元素的子节点创建 Fiber 节点, 添加了调和的过程 */
  reconcileChildren(fiber);
  /** 选择下一个工作单元 */
  return getNextFiber(fiber);
}
```

#### useState 及内部 setState 的实现

```js
/** 执行函数组件的时候，便会执行 useState 函数 */
function useState(initial) {
  /** 初始化 hook */
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
  const hook = { state: oldHook ? oldHook.state : initial, queue: [] };

  /** 1、执行 setState 函数则会收集 action 之后便重置工作单元 */
  const setState = action => {
    hook.queue.push(action);
    const { dom, props } = currentRoot;
    deletions = [];
    wipRoot = { dom, props, alternate: currentRoot };
    nextUnitOfWork = wipRoot;
  }

  /** 2、当工作单元到再次达此函数组件的时候, 便会执行收集的 action */
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => hook.state = action(hook.state));

  /** 将 hooks 存下来 */ 
  wipFiber.hooks.push(hook);
  hookIndex += 1;

  /** 返回 hook 状态、改变 hook 状态的方法 */
  return [hook.state, setState];
}
```

#### 开始渲染

```jsx
/** 4、开始render */
function Counter() {
  const [state, setState] = useState(1);
  const [state2, setState2] = useState(100);

  return (
    <h1 onClick={() => {  setState(c => c + 1);  setState2(c => c + 1) }} style="user-select: none">
      Count: {state} {state2}
    </h1>
  );
}
const element = <Counter />;
const container = document.getElementById('root');
render(element, container);
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
