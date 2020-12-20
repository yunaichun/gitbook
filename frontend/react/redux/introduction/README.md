## 简介

> Redux 学习笔记。

## 如何使用

```text
可以参考文章 Redux 开发实用教程: https://www.devio.org/2019/03/04/redux-development-practical-tutorial。

总结来说，Redux 可以看作是 Flux 架构的一种实现，相比 Flux 架构的不同之处是：
1、Redux 只有一个 store
2、没有 Dispatcher
```

## 核心概念

#### createStore

```text
是一个函数；

接收三个参数，reducer，preloadedState，enhancer；

返回唯一的 store 对象，此对象包含 dispatch、getState、subscribe等方法。
```

#### reducer

```text
是一个函数；

接收两个参数，intinalState、action；

返回新的状态 newState。
```

#### action

```text
是一个标准的FSA对象，至少有一个 type 的属性。参考[flux-standard-action](https://www.npmjs.com/package/flux-standard-action)。

非标准的 action redux是怎么处理，后面到中间件的时候会详细分析。
```

#### subscribe

```text
是一个函数；

接收一个 listener 参数，内部完成对监听的收集，类似 Promise.then、express/koa 的 app.use 完成中间件(监听)的收集。
```

#### dispatch

```text
是一个函数；

接收 action 对象。被认为是改变整个 store 应用状态的唯一方法。

核心是完成 2 个操作：
1、内部去调用 reducer 函数，去改变 store 的状态；
2：遍历执行收集的所有监听函数。
```

#### enhancer

```text
是一个函数，接收 createStore 返回一个增强的 createStore 方法。

即如果存在 enhancer 参数，createStore(reducer, preloadedState, enhancer) 等价于 enhancer(createStore)(reducer, preloadedState)。
```

#### 整个应用的初始状态

```text
createStore 的第二个参数 preloadedState，

reducer 的第一个参数 intinalState。

优先级是前者大。可以参考: https://cn.redux.js.org/docs/recipes/reducers/InitializingState.html
```

## 核心方法

- createStore
- combineReducers
- bindActionCreators
- applyMiddleware

## 参考资料

- [Redux官方文档](https://redux.js.org/introduction/getting-started)
- [Redux中文文档](http://cn.redux.js.org/)
- [Redux官方仓库](https://github.com/reduxjs/redux)
- [Redux从设计到源码](https://tech.meituan.com/2017/07/14/redux-design-code.html)
- [React.js小书](http://huziketang.mangojuice.top/books/react/lesson30)
- [react-redux官方仓库](https://github.com/reduxjs/react-redux)
- [redux-promise官方仓库](https://github.com/redux-utilities/redux-promise)
- [redux-thunk官方仓库](https://github.com/reduxjs/redux-thunk)
