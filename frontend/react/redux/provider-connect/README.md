## 简介

> react-redux 的 Provider 与 connect 实现学习笔记。

## Provider

#### 含义

```text
Provider 是一个容器组件，它会把嵌套的内容原封不动作为自己的子组件渲染出来。

它还会把 Provider 的 store 属性存入 getChildContext 中，这样子组件可以通过 this.context.store 获取得到。
```

#### 实现

```js
export class Provider extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

Provider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.any
};
```

## connect

#### 含义

```text
高阶组件是一个函数，接收一个组件作为参数，返回一个新的组件。作用是可以在此高阶组件内部做一些业务数据等处理。

connect 是一个函数，接收两个参数 mapStateToProps 和 mapDispatchToProps 两个对象参数。
执行后返回一个高阶组件。

connect 函数的作用是可以使容器组件获取到 context 中的指定的值。
```

#### 实现

```js
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    constructor() {
      super();
      // == 用来保存需要传给被包装组件的所有的参数
      this.state = { allProps: {} };
    }

    static contextTypes = {
      store: PropTypes.object
    }

    // == 在 componentWillMount 生命周期即 subscribe 订阅函数。如果 store 变化即重新设置当前组件的 state
    componentWillMount() {
      const { store } = this.context;
      // == 调用 _updateProps 进行初始化
      this._updateProps();
      // == 通过 store.subscribe 监听数据变化重新调用 _updateProps
      // == 即所有使用到 connect 生成的组件都将接收新的 props 触发更新渲染
      store.subscribe(() => this._updateProps());
    }

    _updateProps() {
      const { store } = this.context;
      // == 这里的 store.getState() 才是实际参数
      let stateProps = mapStateToProps 
        ? mapStateToProps(store.getState(), this.props)
        : {};
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {};
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      });
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />
    }
  }
}
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
