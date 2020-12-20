## 简介

> Redux combineReducers 源码及使用学习笔记。

## 用途

```text
可以把多个 reducer 结合起来，返回一个新的 reducer。

配合 react-redux 的 connect 使用，可以不让组件察觉到 Redux 的存在， 即在 react 组件中不会显示 dispatch。
```

## combineReducers 源码

```text
是一个函数，接收 reducers 对象({ key: value })。

返回一个新的 reducer 函数。

由于此函数是 reducer，所以可以知道此函数依旧接收 intinalState 和 action 为参数，返回新状态。

dispatch 一个 action 会遍历所有被 combineReducers 处理的所有 reducer，每个 reducer 都会调用 reducer(state[key], action)
```

```js
// == 部分校验逻辑的代码省略
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    // == 省略： reducer 的值不能为 undefined；reducer 的值是函数的话就存起来
  }

  /*1、过滤掉 undefined 的 reducers 的 keys 数组*/
  const finalReducerKeys = Object.keys(finalReducers)

  /*2、reducers 和 state 里一样的 key 会有警告*/
  let unexpectedKeyCache

  /*3、判断 reducers 正确性：初始状态传入 undefined 返回结果不为 undefined ；不能使用 "redux/*" 私有命名空间*/
  let shapeAssertionError
  try { ssertReducerShape(finalReducers) } catch (e) { shapeAssertionError = e }

  /*返回合并后的 reducer*/
  return function combination(state = {}, action) {
    /*状态是否改变*/
    let hasChanged = false
    const nextState = {}
    /*取得每个子 reducer 对应的 state，与 action 一起作为参数给每个子 reducer 执行*/
    for (let i = 0; i < finalReducerKeys.length; i++) {
      /*得到本次循环的子 reducer */
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      /*得到该子 reducer 对应的旧状态*/
      const previousStateForKey = state[key]
      /*调用子 reducer 得到新状态*/
      const nextStateForKey = reducer(previousStateForKey, action)
      /*reducer 计算出来的值为 undefined 的话，返回警告信息*/
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      /*下一步状态与当前状态不一致代表状态已经改变*/
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    /*返回最新的 state*/
    return hasChanged ? nextState : state
  }
}
```

## combineReducers 用法示例

```js
import {combineReducers} from 'redux';
import user from './userReducer';

const reducers = combineReducers({
    user,
});

export default reducers;
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
