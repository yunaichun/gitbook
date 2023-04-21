## 简介

> Redux applyMiddleware 源码及使用学习笔记。

## 用法

```js
// == 用法一(createStore 内部实际是调用用法二)
const store = createStore(reducer, initial_state, applyMiddleware(thunk, promise, logger))

// == 用法二
const store = applyMiddleware(thunk, promise, logger)(createStore)(reducer, initialState)
```

## applyMiddleware 源码

```text
applyMiddleware 接收中间件数组，返回一个函数。

返回的函数数接收 createStore 作为参数，返回增强的 createStore 方法。
```

```js
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    /*用参数传进来的 createStore 创建一个 store*/
    const store = createStore(...args)

    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    // == 中间件第一个参数先注入 store 的 getState 和 dispatch 方法
    const chain = middlewares.map(middleware => middleware(middlewareAPI))

    // == 中间件第二个参数传入 store.dispatch，此时返回一个新的 dispatch 函数
    // == 则由 dispatch 函数定义可知，此函数一定接收一个 action 数据
    // == 此时中间件就可以对 action 的类型扩展
    dispatch = compose(...chain)(store.dispatch)
   
    return {
      ...store,
      dispatch
    }
  }
}
```

## compose 源码

- 源码

```js
export default function compose(...funcs) {
  /*当未传入函数时，返回一个函数：arg => arg*/
  if (funcs.length === 0) {
    return arg => arg
  }

  /*当只传入一个函数时，直接返回这个函数*/
  if (funcs.length === 1) {
    return funcs[0]
  }

  /*返回组合后的函数*/
  // == reduce 处理到第三个中间件: (...arg1) => ((...args) => a(b(...args)))(c(...args1))
  // == 此处的 reduce 最终处理的结果是返回一个函数，由 applyMiddleware 方法可知传入第一个值为 store.dispatch
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

- 分析

```text
funcs.reduce((a, b) => (...args) => a(b(...args)))
var res1 = (...args) => a(...args)
var res2 = (...args) => b(...args)
var res3 = (...args) => c(...args)

1、结合 applyMiddleware 代码首先传入 store.dispatch 给 res3
2、res3 执行结果传给 res2
3、res2 执行结果传给 res1
```

## 中间件形式

```text
1、由源码可以看出，一个最简单的中间件的格式: store => next => action => {}

2、中间件的第一个参数 middlewareAPI 即为 store
getState 可以获取 store 应用的状态
dispatch 参数对应的是 actionCreators 返回函数的形参 dispatch (拿 redux-thunk 举例)

3、中间件的第二个参数 next, 实际是直接调用 store.dispatch
```

## 日志中间件

```js
const logger = store => next => action => {
  console.log(`prev state ${store.getState()}`);
  console.log(`dispatch action ${action}`);
  next(action);
  console.log(`current state ${store.getState()}`);
}

const store = applyMiddleware(logger)(createStore)(reducer, initialState);
store.dispatch(action);
```

## applyMiddleware 作用

```text
1、由后面2节 redux-thunk、redux-promise 中间件则会对 action 的类型做扩充。
（增强了 store -> 即增强了 store 的 dispatch 方法 -> 即增强了 action 的类型）

2、由日志中间件可以看出，applyMiddleware 可以对 store.dispatch 做一层拦截，在内部做一些额外的操作。
（类似 es6 装饰器、node 中间件、react 高阶函数）
```

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
