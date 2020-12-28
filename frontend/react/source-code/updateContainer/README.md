## 简介

> React - updateContainer 源码阅读学习笔记。

## updateContainer 流程

```text
updateContainer ->

scheduleUpdateOnFiber(container.current) ->

performSyncWorkOnRoot(rootFiber)
```

## performSyncWorkOnRoot 流程

```
1. flushPassiveEffects -> runWithPriority -> flushPassiveEffectsImpl -> flushSyncCallbackQueue

2. renderRootSync -> workLoopSync -> performUnitOfWork(workInProgress)

3. commitRoot(rootFiber)
```

## 源码阅读

> 地址: https://github.com/yunaichun/react-study

## 参考资料

- [React官方文档](https://reactjs.org)
- [React源码](https://github.com/facebook/react/tree/8b2d3783e58d1acea53428a10d2035a8399060fe)
- [React源码解析](https://react.jokcy.me/)
- [阿里知乎专栏](https://zhuanlan.zhihu.com/purerender)
- [React内部原理](http://tcatche.site/2017/07/react-internals-part-one-basic-rendering/)
- [React技术揭秘](https://react.iamkasong.com/)
