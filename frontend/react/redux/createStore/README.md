## 简介

> Redux createStore 模拟实现学习笔记。

## createStore 模拟实现

```js
/**
 * [createStore 创建 store 应用程序]
 * @param  {[Function]} reducer      [纯函数：封装成修改应用状态的 dispatch 方法]
 * @return {[Object]}                [返回一个对象：包含三个方法 getState、dispatch、subscribe]
 */
function createStore(reducer) {
  let state = null;
  const listeners = [];
  /*一、数据修改后自动执行的订阅函数*/
  const subscribe = (listener) => listeners.push(listener);
  /*二、获取应用状态数据*/
  const getState = () => state;
  /*三、修改应用状态数据*/
  const dispatch = (action) => {
    /*1、修改应用程序的状态：传入当前 state -> 生成新的 state -> 覆盖原对象*/
    state = reducer(state, action);
    /*2、应用程序的状态修改后，自动执行的订阅函数*/
    listeners.forEach((listener) => listener());
  };
  dispatch({});
  return { getState, dispatch, subscribe };
}
```

## createStore 初始化应用状态

```js
/*创建 store 应用程序*/
const store = createStore(reducer);
/*缓存旧的 state*/
let oldState = store.getState();
/*应用程序状态修改后：执行订阅函数*/
store.subscribe(() => {
  /*渲染前：应用程序最新 state*/
  const newState = store.getState();
  /*执行订阅函数*/
  renderApp(newState, oldState);
  /*渲染后：将新的 state 置为旧的 state*/
  oldState = newState;
});
```

## reducer 修改应用状态

```js
/**
 * [reducer 纯函数：修改应用状态的专用方法 -> 通过 createStore 方法包转成 dispatch 函数]
 * @param  {[Object]} state  [应用状态]
 * @param  {[Object]} action [修改应用状态的指令：包括 type 和 payload]
 * @return {[Object]}        [返回最新的应用状态]
 */
function reducer(state, action) {
  /*应用初始状态*/
  if (!state) {
    return {
      title: {
        text: 'title',
        color: 'red',
      },
      content: {
        text: 'content',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      /*构建新的对象并且返回*/
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      /*构建新的对象并且返回*/
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      /*没有修改，返回原来的对象*/
      return state;
  }
}
```

## 页面首次渲染

```js
/**
 * [renderApp 主渲染函数]
 * @param  {[Object]} newAppState [最新应用状态]
 * @param  {[Object]} oldAppState [上一次应用状态]
 */
function renderApp(newAppState, oldAppState = {}) {
  /*数据没有变化就不渲染了*/
  if (newAppState === oldAppState) return;
  console.log('render app...');
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}
/**
 * [renderTitle 渲染 title]
 * @param  {[Object]} newTitle [最新 title]
 * @param  {[Object]} oldTitle [上一次 title]
 */
function renderTitle(newTitle, oldTitle = {}) {
  /*数据没有变化就不渲染了*/
  if (newTitle === oldTitle) return;
  console.log('render title...');
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}
/**
 * [renderContent 渲染 content ]
 * @param  {[Object]} newContent [最新 content]
 * @param  {[Object]} oldContent [上一次 content]
 */
function renderContent(newContent, oldContent = {}) {
  /*数据没有变化就不渲染了*/
  if (newContent === oldContent) return;
  console.log('render content...');
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

/*首次渲染页面*/
renderApp(store.getState());
```

## 修改状态后渲染

```js
/*修改标题文本*/
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'new title' });
/*修改标题颜色*/
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' });
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
