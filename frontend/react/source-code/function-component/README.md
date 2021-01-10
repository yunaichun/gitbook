## 简介

> React - Function Component 源码阅读学习笔记。

## 知识回顾

参考这里: https://www.answera.top/frontend/react/source-code/beginWork

## beginWork 流程分析

#### updateFunctionComponent 流程分析

**参数**

```
1、current: 代表 旧 Fiber
2、workInProgress: 代表新 Fiber
3、Component: 这个 type 实际是函数组件本身，执行就会返回函数组件 return 的内容
4、resolvedProps: 新的 props
5、renderLanes: 调度优先级
```

**流程**

```
1、renderWithHooks 返回函数组件的children
2、reconcileChildren 通过 sibling 处理所有子节点
```

#### renderWithHooks 流程分析

```
1、执行函数组件：children = Component(props, secondArg)

2、返回函数组件的 children 节点
```

#### reconcileChildren 流程分析

**参数**

```
1、workInProgress: 代表新 Fiber
2、current: 代表 旧 Fiber 的第一个子节点
3、nextChildren: renderWithHooks 返回的值
4、renderLanes: 调度优先级
```

**流程**

```
1、实际会调用 ReactChildFiber.old.js 文件的 ChildReconciler 函数
2、实际会调用 ChildReconciler 函数
3、ChildReconciler 会返回 reconcileChildFibers 函数
```

**返回**

```
workInProgress.child = reconcileChildFibers(
    workInProgress,
    current.child,
    nextChildren,
    renderLanes,
);
reconcileChildFibers 会执行 reconcileChildFibers，通过 sibling 处理所有子节点
```


#### reconcileChildFibers 流程分析

**参数**

```
1、returnFiber: 构建中 Fiber
2、currentFirstChild: 代表 旧 Fiber 的第一个子节点
3、newChild: 不同组件实际返回的子节点
4、lanes: 调度优先级

reconcileChildFibers 的参数即为 reconcileChildren 的参数
```

**单节点diff**

```
1、调用函数 reconcileSingleElement

2、与 reconcileChildFibers 参数一致
```

#### 多节点diff

```
1、调用函数 reconcileChildrenArray

2、与 reconcileChildFibers 参数一致
```

## useState 等 Hooks

```
待看
```

## 源码阅读

> 地址: https://github.com/yunaichun/react-study

## 参考资料

- [React官方文档](https://reactjs.org)
- [React源码](https://github.com/facebook/react/tree/8b2d3783e58d1acea53428a10d2035a8399060fe)
- [凹凸实验室](https://aotu.io/notes/2020/11/12/react-indoor/index.html)
- [阿里知乎专栏](https://zhuanlan.zhihu.com/purerender)
- [React源码解析](https://react.jokcy.me/)
- [React技术揭秘](https://react.iamkasong.com/)
- [React内部原理](http://tcatche.site/2017/07/react-internals-part-one-basic-rendering/)
