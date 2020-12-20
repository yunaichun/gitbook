## 简介

> redux-promise 源码学习笔记。

## 作用

```text
是 redux 异步中间件。

可以扩展 action 的类型。

action 可以返回一个 promise。
```

## 源码解析

```js
import isPromise from 'is-promise';
import { isFSA } from 'flux-standard-action';

// == 此处的 { dispatch, getState } 实际被传入的是 applyMiddleware.js 中的 middlewareAPI
// == 此处的 next 实际被传入的是 applyMiddleware.js 中的 store.dispatch
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    // == 1、action 不是标准的FSA
    if (!isFSA(action)) {
      // == 执行此 action Promise 函数的 then 方法中再调用 dispatch 方法真正的改变应用的状态
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    // == 2、action 是标准的FSA
    // == 执行此 action Promise 函数的 then 方法中再调用 dispatch 方法真正的改变应用的状态
    return isPromise(action.payload)
      ? action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}
```

## 执行逻辑

```text
以 action 不是标准的 FSA 对象为例，action 是标准的 FSA 对象逻辑分析一致:

action 为 Promise 函数的话，执行此 Promise 函数，传入 dispatch，

然后可以在此 Promise 函数的 then 方法里再调用 dispatch 方法真正的改变应用的状态。
```

## 使用案例

> actionCreators

```js
export const actionObj = {
    getData(option) {
        // == 返回的结果不是标准的 action，是一个函数: 通过 redux-promise 中间件处理
        return new Promise((res, rej) => {
          res({type, payload})
        });
    },
};
```

> connect

```js
// == connect 的实现后续会讲到
export default connect(
    state => ({
        data: state.data.toJSON(),
    }),
    dispatch => {
        return {
            // == 执行 this.props.actions.getData(data) 等价于 this.props.dispatch(actionObj.getData(data))
            // == actionObj.getData(data) 返回的结果不是标准的 action，是一个函数
            actions: bindActionCreators(actionObj, dispatch)
        };
   }
)(Index);
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
