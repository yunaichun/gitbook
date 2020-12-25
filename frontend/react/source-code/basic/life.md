## 简介

> React 生命周期 学习笔记。

## 挂载阶段

```
1、constructor
必须在构造函数第一行执行super(props)，否则我们无法在构造函数里拿到this对象

2、static getDerivedStateFromProps(nextProps, prevState)    <->   componentWillMount

3、render
原生的DOM，如div
React组件
Fragment（片段）
Portals（插槽）
字符串和数字，被渲染成text节点
Boolean和null，不会渲染任何东西

4、componentDidMount
componentWillUnmount中取消订阅
```

## 更新阶段

#### 更新条件

```
1、组件的 props 改变了

2、组件内部调用了 setState

3、组件内部调用 forceUpdate 发生
```

#### 经历阶段

```
1、static getDerivedStateFromProps(nextProps, prevState)   <->  componentWillReceiveProps
一个静态方法，所以不能在这个函数里面使用this，
这个函数有两个参数 props 和 state，分别指接收到的新参数和当前的state对象，
这个函数会返回一个对象用来更新当前的state对象，如果不需要更新可以返回null

2、shouldComponentUpdate(nextProps, nextState)
需要将 this.props 与 nextProps以及 this.state 与 nextState 进行比较来决定是否返回 false，来减少重新渲染
官方提倡我们使用PureComponent来减少重新渲染的次数而不是手工编写shouldComponentUpdate代码

3、render

4、getSnapshotBeforeUpdate(prevProps, prevState)   <->  componentWillUpdate
这个方法在render之后，componentDidUpdate之前调用，
有两个参数prevProps和prevState，表示之前的属性和之前的state，
这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，请返回null，不写的话控制台会有警告
还有这个方法一定要和componentDidUpdate一起使用，否则控制台也会有警告

5、componentDidUpdate(prevProps, prevState, snapshot)
```

## 卸载阶段

```
componentWillUnmount

当我们的组件被卸载或者销毁了就会调用，
我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作
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
- [21个React性能优化技巧](https://www.infoq.cn/article/KVE8xtRs-uPphptq5LUz)

#### 核心思想

- [React Fiber 是什么？](https://github.com/WangYuLue/react-in-deep/blob/main/02.React%20Fiber%20%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.md)
