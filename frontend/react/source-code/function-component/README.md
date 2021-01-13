## 简介

> React - Function Component 源码阅读学习笔记。

## beginWork 整体流程

- 图片地址: https://www.answera.top/frontend/react/source-code/beginWork/beginWork.png
- 源文件地址: https://www.answera.top/frontend/react/source-code/beginWork/beginWork.xmind

![beginWork](../beginWork/beginWork.png)

## reconcileChildren 前处理

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
1、renderWithHooks 返回函数组件的 children
children = Component(props, secondArg)

2、reconcileChildren(current, workInProgress, nextChildren, renderLanes);
通过 current.sibling 处理所有子节点

3、返回下一个工作单元 workInProgress.child
```

#### reconcileChildren 流程分析

参考这里: https://www.answera.top/frontend/react/source-code/beginWork

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
