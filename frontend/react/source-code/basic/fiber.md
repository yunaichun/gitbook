## 简介

> React Fiber学习笔记。

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
