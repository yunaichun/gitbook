## 简介

> Redux bindActionCreator 源码及使用学习笔记。

## 用途

```text
配合 react-redux 的 connect 使用，可以不让组件察觉到 Redux 的存在，

即在 react 组件中不直接调用 store 的 dispatch 方法。
```

## bindActionCreator 源码

```text
是一个函数，接收 actionCreator 函数和 dispatch 函数。

返回一个函数，此函数会 dispatch 一个 action

此 action 是 actionCreator 函数的执行结果
```

```js
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}
```

## bindActionCreators 源码

```text
是一个函数，接收 actionCreators 函数和 dispatch 函数。

返回一个函数或对象
1、actionCreators 是函数的话直接调用 bindActionCreator 函数
2、actionCreators 是对象的话循环遍历 actionCreators，返回一个对象:
对象每一个 key 的 value 是 bindActionCreator(actionCreator, dispatch)
```

```js
export default function bindActionCreators(actionCreators, dispatch) {
  /* 一、actionCreators 是函数的话直接调用 bindActionCreator 函数 */
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  /* actionCreators 必须是对象或者函数 */
  if (typeof actionCreators !== 'object' || actionCreators === null) {
      // == 省略
  }

  /* 二、actionCreators 是对象的话循环遍历 actionCreators，返回一个对象 */
  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```

## bindActionCreators 用法示例

#### actionCreators 为函数

> actionCreators

```js
function getData(option) {
    return dispatch => {
        return Get(url, option).then(res => {
            dispatch({ type, payload });
        });
    };
}
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
            // == 执行 this.props.getData(data) 等价于 this.props.dispatch(getData(data))
            // == getData(data) 不是标准的 action，而是一个函数，后续讲中间件会讲到
            getData: bindActionCreators(getData, dispatch)
        };
   }
)(Index);
```

#### actionCreators 为对象

> actionCreators

```js
export const actionObj = {
    getData(option) {
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
            // == actionObj.getData(data) 返回的结果不是标准的 action，而是一个函数，后续讲中间件会讲到
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
