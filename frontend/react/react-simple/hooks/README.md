## 简介

> React 简易实现-Hooks学习笔记。

## 函数组件回顾

```text
1、函数组件 Fiber 节点的 type 属性函数本身

2、则执行此函数即 fiber.type(fiber.props) 会返回当前函数组件的实际的节点树

3、假如在函数组件内部执行 useState 函数，则当执行函数组件，即 fiber.type(fiber.props) 时，则 useState 也会被执行
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

2、执行函数组件的时候，便会执行 useState 函数
第一步：主要是执行收集的 action，传入当前的 state
第二步：最后返回新的 state，同时返回 setState 方法

3、setState 方法
第一步：将 setState 参数 action 方法收集起来
第二步：立即重置工作单元 nextUnitOfWork 为根节点
第三步：当工作单元到再次达此函数组件的时候，便会执行 useState 函数
```

## useState 实现方案

#### 函数组件 Fiber 节点添加 hooks 属性

```js
// == 设置进行构建中的子 Fiber 节点
let wipFiber = null;
// == Fiber 树中添加 hooks 数组: 支持在同一组件中多次调用 useState , 并且我们跟踪当前 hook 索引
let hookIndex = null;
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  // == 函数组件有一个 hooks 属性存储 useState 钩子函数数组
  wipFiber.hooks = [];
  // == 函数组件跟踪 hooks 数组索引
  hookIndex = 0;
  // == 执行此函数组件: fiber.type() -> createElement() -> js 对象【和 fiber.props.children 一致】
  // == 区别是函数组件没有 dom 等属性, 同时经过 createElement 解析之后 type 为 Function【实际是此函数组件本身】
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
```

#### useState 及内部 setState 的实现

```js
// == 执行函数组件的时候，便会执行 useState 函数
// 第一步：主要是执行收集的 action，传入当前的 state
// 第二步：最后返回新的 state，同时返回 setState 方法
function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    // == 当函数组件调用 useState 时，我们检查是否有旧的 hook, 有则取旧 hook 的 state, 否则取初始化 state
    state: oldHook ? oldHook.state : initial,
    // == 改变 hook 状态的 action 队列
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  // 1、将 setState 参数 action 方法收集起来
  // 2、立即重置工作单元 nextUnitOfWork 为根节点
  // 3、当工作单元到再次达此函数组件的时候，便会执行 useState 函数
  const setState = action => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
  }

  wipFiber.hooks.push(hook);
  hookIndex++;
  // == 返回 hook 状态、改变 hook 状态的方法
  return [hook.state, setState];
}
```

#### 开始渲染

```jsx
function Counter() {
  const [state, setState] = useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)} style="user-select: none">
      Count: {state}
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
