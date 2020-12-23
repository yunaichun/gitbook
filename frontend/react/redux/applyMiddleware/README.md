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
applyMiddleware 接收中间件数组

返回增强的 createStore 方法
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

```text
compose 接收中间件数组。由 applyMiddleware 源码可知，此数组的每一项中间件均执行了一次，传入了第一个参数 store。

compose 返回一个函数，此函数从后向前执行传进来的中间件数组的每一项，每次的执行结果传入到中间件数组的前一项。

reduce 假如处理到第三个中间件，则结果为: (...arg1) => ((...args) => a(b(...args)))(c(...args1))
```

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
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


```

## 中间件形式

```text
由源码可以看出，一个最简单的中间件的格式: store => next => action => {}

在中间件中传递 store 参数，相当于 applyMiddleware 传递 middlewareAPI

在中间件中传递 next 参数，相当于 applyMiddleware 传递 store.dispatch
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
1、由日志中间件可以看出，applyMiddleware 可以对 store.dispatch 做一层拦截，在内部做一些额外的操作。
（类似 es6 装饰器、node 中间件、react 高阶函数）

2、由后面2节 redux-thunk、redux-promise 中间件则会对 action 的类型做扩充。
（增强了 store -> 即增强了 store 的 dispatch 方法 -> 即增强了 action 的类型）
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
