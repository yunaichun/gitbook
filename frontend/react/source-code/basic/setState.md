## 简介

> React setState 学习笔记。

## 合成事件中的setState

```
异步
```

## 生命周期函数中的setState

```
异步
```

## 原生事件中的setState

```
同步
```

## setTimeout中的setState

```
同步
```

## setState中的批量更新

```
1、setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的

2、在原生事件和 setTimeout 中不会批量更新

3、在“异步”中如果对同一个值进行多次 setState ， 
setState 的批量更新策略会对其进行覆盖，取最后一次的执行，
如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

4、在 setState 的时候react内部会创建一个 updateQueue ，
通过 firstUpdate 、 lastUpdate 、 lastUpdate.next 去维护一个更新的队列，
在最终的 performWork 中，相同的 key 会被覆盖，只会对最后一次的 setState 进行更新。
```

## 调用 setState 之后发生了什么

```
1、在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。

2、然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。

3、然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。

4、当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。

5、当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。
```

## 如何 diff Fiber 树的

#### tree diff

```
只对比同一层的 dom 节点，忽略 dom 节点的跨层级移动

react 只会对同一层级的 DOM 节点进行比较，即同一个父节点下的所有子节点。

当发现节点不存在时，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。

这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

这就意味着，如果 dom 节点发生了跨层级移动，react 会删除旧的节点，生成新的节点，而不会复用。
```

#### component diff

```
如果不是同一类型的组件，会删除旧的组件，创建新的组件
```

#### element diff

```
对于同一层级的一组子节点，需要通过唯一 id 进行来区分
```

## 总结

```
setState 的“异步”并不是说内部由异步代码实现，
其实本身执行的过程和代码都是同步的，
只是合成事件和钩子函数的调用顺序在更新之前，
导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，
当然可以通过第二个参数 setState(partialState, callback) 中的 callback拿到更新后的结果。
```

## 参考资料

#### 知识概览

- [React 灵魂 23 问，你能答对几个？](https://zhuanlan.zhihu.com/p/304213203)

#### 基本知识

- [探索 React 合成事件](https://juejin.cn/post/6897911576053940231)
- [你真的理解 setState 吗？](https://juejin.cn/post/6844903636749778958#heading-5)
- [我对 React v16.4 生命周期的理解](https://juejin.cn/post/6844903655372488712)

#### Hooks 相关

- [React 函数式组件性能优化指南](https://zhuanlan.zhihu.com/p/137302815)
- [烤透 React Hook](https://juejin.cn/post/6867745889184972814)
- [21 个 React 性能优化技巧](https://www.infoq.cn/article/KVE8xtRs-uPphptq5LUz)
- [React.PureComponent 配上 ImmutableJS 才更有意义](https://juejin.cn/post/6844903501592526855)

#### 核心思想

- [React Fiber 是什么？](https://github.com/WangYuLue/react-in-deep/blob/main/02.React%20Fiber%20%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.md)
