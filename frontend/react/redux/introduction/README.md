## 简介

> Redux 学习笔记。

## 如何使用

```text
可以参考文章 Redux 开发实用教程: https://www.devio.org/2019/03/04/redux-development-practical-tutorial。

Redux 可以看作是 Flux 架构的一种实现，相比 Flux 架构的不同之处是：
1、Redux 只有一个 store
2、没有 Dispatcher
```

## 核心概念

#### createStore

```text
是一个函数：创建数据源；

接收三个参数，reducer，preloadedState，enhancer；

返回唯一的 store 对象，此对象包含 dispatch、getState、subscribe等方法。
```

#### reducer

```text
是一个函数：修改数据源；

接收两个参数，intinalState、action；

返回新的状态 newState。
```

#### action

```text
是一个标准的FSA对象，至少有一个 type 的属性：代表修改数据源的类型。参考[flux-standard-action](https://www.npmjs.com/package/flux-standard-action)。

非标准的 action redux是怎么处理，后面到中间件的时候会详细分析。
```

#### dispatch

```text
是一个函数：调用 reducer 修改数据源，同时遍历执行 subscribe 函数收集的所有监听函数。；

接收 action 对象。被认为是改变整个 store 应用状态的唯一方法。
```

## 核心方法

- createStore: dispatch、subscribe、getState
- combineReducers
- bindActionCreators
- applyMiddleware

## 源码阅读

> 地址: https://github.com/yunaichun/react-study

## 参考资料

- [Redux官方文档](https://redux.js.org/introduction/getting-started)
- [Redux中文文档](http://cn.redux.js.org/)
- [Redux官方仓库](https://github.com/reduxjs/redux)
- [Redux从设计到源码](https://tech.meituan.com/2017/07/14/redux-design-code.html)
- [React.js小书](http://huziketang.mangojuice.top/books/react/lesson30)
- [react-redux官方仓库](https://github.com/reduxjs/react-redux)
- [redux-promise官方仓库](https://github.com/redux-utilities/redux-promise)
- [redux-thunk官方仓库](https://github.com/reduxjs/redux-thunk)
