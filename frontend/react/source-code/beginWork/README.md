## 简介

> React - beginWork 源码阅读学习笔记。

## beginWork 整体流程

- 图片地址: https://www.answera.top/frontend/react/source-code/beginWork/beginWork.png
- 源文件地址: https://www.answera.top/frontend/react/source-code/beginWork/beginWork.xmind

![beginWork](./beginWork.png)

## reconcileChildren 前处理

#### Class Component

地址: https://www.answera.top/frontend/react/source-code/class-component

#### Function Component

地址: https://www.answera.top/frontend/react/source-code/function-component

#### 主要作用

```
1、根据 UpdateQueue 计算出最新的 state，存入 workInProgress 的 memoizedState。

2、拿到不同组件类型的实际的 children 节点:
如果是 Class Component     ->  nextChildren = instance.render()
如果是 Function Component  ->  nextChildren = Component(props, secondArg)

3、保证不同组件传递给 reconcileChildren 函数的 nextChildren 是一致的节点
reconcileChildren 阶段根据 current 与 nextChildren 对比找出差异，更新 workInProgress。
```

## reconcileChildren 流程分析

#### reconcileChildren 分析

**参数**

```
1、current: 代表 旧 Fiber 的第一个子节点
2、workInProgress: 代表新 Fiber
3、nextChildren: 对于 class 组件是 instance.render(); 对于函数组件是 Component(props, secondArg)
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
reconcileChildFibers 会执行通过 sibling 处理所有子节点
```

#### reconcileChildFibers 分析

**参数**

```
1、returnFiber: 构建中 Fiber
2、currentFirstChild: 代表旧 Fiber 的第一个子节点
3、newChild: 对于 class 组件是 instance.render(); 对于函数组件是 renderWithHooks 返回的值
4、lanes: 调度优先级
```

**单节点diff**

```
1、调用函数 reconcileSingleElement

2、与 reconcileChildFibers 参数一致
```

**多节点diff**

```
1、调用函数 reconcileChildrenArray

2、与 reconcileChildFibers 参数一致
```

## 节点 diff 逻辑分析

#### 遍历逻辑

```
1、beginWork 主要作用是 reconcile 协调处理所有子节点；
传入当前工作单元 workInProgress 和 current；
返回下一个工作单元，即 workInProgress 第一个子节点 workInProgress.child。

2、beginWork 内部遍历顺序：
通过 current.child.sibling 依次处理了所有的子节点；
同时使每个子节点的 return 属性均指向父节点 current。

3、由此可以看到：
beginWork 是顶部向下一层一层处理，即为自上而下的广度优先。
```

#### 单节点diff

```
 1、key 相同，type 相同：复用 FiberNode 节点

2、key 相同，type 不同：将 child 及其兄弟 fiber 都标记删除。

3、key 不同：仅将 child 标记删除
```

#### 多节点diff

```
1、同时遍历 newChildren 和 oldFiber
两者 key 相同，type 相同 -> 复用节点；
两者 key 不同、文本节点和数组节点之前存在 key -> 跳出循环；之后可能会走下面 2，3，4步骤的逻辑；
两者 key 相同，type 不同 -> 创建 newFiber，同时将 oldFiber 标记为删除

2、newChildren 遍历完，oldFiber 没遍历完
剩余 oldFiber 后续 siblings 标记删除

3、newChildren 没遍历完，oldFiber 遍历完
剩余 newChildren 创建 newFiber

4、newChildren 没遍历完，oldFiber 没遍历完
优先复用节点
没有则创建 newFiber，同时将 oldFiber 标记为删除
```

#### 节点删除标记链表

```js
1、parent 添加第一个删除节点 childToDelete

parent.firstEffect = child = parent.lastEffect


2、parent 添加第二个删除节点 childToDelete

                    nextEffect 
parent.firstEffect -----------> parent.lastEffect = child


3、parent 添加第三个删除节点 childToDelete

                     nextEffect        nextEffect
parent.firstEffect -----------> child -----------> parent.lastEffect = child

代码位置: react-reconciler/src/ReactChildFiber.old.js
代码方法: deleteChild
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
