## 简介

> redux-thunk 源码学习笔记。

## 作用

```text
是 redux 异步中间件。

可以扩展 action 的类型。

action 可以返回一个函数。
```

## 源码解析

```js
function createThunkMiddleware(extraArgument) {
  // == 此处的 { dispatch, getState } 实际被传入的是 applyMiddleware.js 中的 middlewareAPI
  // == 此处的 next 实际被传入的是 applyMiddleware.js 中的 store.dispatch
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      // == 执行 action 函数，在 action 内部再调用 dispatch 方法真正的改变应用的状态
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
```

## 执行逻辑

```text
action 为函数的话，执行此 action 函数，传入 dispatch 和 getState，

然后可以在此 action 函数内部再调用 dispatch 方法真正的改变应用的状态。
```

## 使用案例

> actionCreators

```js
export const actionObj = {
    getData(option) {
        // == 返回的结果不是标准的 action，是一个函数: 通过 redux-thunk 中间件处理
        return dispatch => {
            return Get(url, option).then(res => {
                dispatch({ type, payload });
            });
        };
    },
};
```

> connect

```js
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

## 参考资料

- [Redux官方文档](https://redux.js.org/introduction/getting-started)
- [Redux中文文档](http://cn.redux.js.org/)
- [Redux官方仓库](https://github.com/reduxjs/redux)
- [Redux从设计到源码](https://tech.meituan.com/2017/07/14/redux-design-code.html)
- [React.js小书](http://huziketang.mangojuice.top/books/react/lesson30)
- [react-redux官方仓库](https://github.com/reduxjs/react-redux)
- [redux-promise官方仓库](https://github.com/redux-utilities/redux-promise)
- [redux-thunk官方仓库](https://github.com/reduxjs/redux-thunk)
