## 简介

> React - Class Component 源码阅读学习笔记。

## 生命周期

#### 挂载阶段

```
1、constructor
必须在构造函数第一行执行 super(props)，否则我们无法在构造函数里拿到 this 对象

2、static getDerivedStateFromProps(nextProps, prevState) 取代 componentWillMount
一个静态方法，所以不能在这个函数里面使用 this

3、render
原生的 DOM，如 div、React 组件、Fragment（片段）、Portals（插槽）
字符串和数字，被渲染成 text 节点
Boolean 和 null，不会渲染任何东西

4、componentDidMount
```

#### 更新阶段

> 触发更新操作

```
1、HostRoot: ReactDOM.render

2、ClassComponent: this.setState、this.forceUpdate、props 改变

3、FunctionComponent: useState、useReducer
```

> 经历过程

```
1、static getDerivedStateFromProps(nextProps, prevState) 取代 componentWillReceiveProps
返回一个对象用来更新当前的 state 对象，如果不需要更新返回 null

2、shouldComponentUpdate(nextProps, nextState) ，默认返回 true
对比 state 和 props 决定是否渲染，来减少重新渲染，官方提倡使用 PureComponent 替代 shouldComponentUpdate

3、render

4、getSnapshotBeforeUpdate(prevProps, prevState) 取代 componentWillUpdate
返回值会作为第三个参数传给 componentDidUpdate，如果不需要返回值返回 null，不写的话控制台会有警告
一定要和 componentDidUpdate 一起使用，否则控制台也会有警告

5、componentDidUpdate(prevProps, prevState, snapshot)
```

#### 卸载阶段

```
componentWillUnmount

可以在这个函数里去清除一些定时器，取消绑定的事件等操作
```

#### 错误边界

```
static getDerivedStateFromError()

componentDidCatch()
```

## setState 相关问题

#### 生命周期和合成事件

> 是异步

```js
componentDidMount() { 
    console.log('开始调用', this.state.count); // 开始调用 0 
    this.setState({ count: this.state.count + 1 }); 
    console.log('count1', this.state.count); // count1 0 
    this.setState({ count: this.state.count + 1 }); 
    console.log('count2', this.state.count); // count2 0 
}
```

#### 异步代码和原生事件

> 是同步

```js
componentDidMount() { 
    setTimeout(() => { 
        console.log('开始调用', this.state.count); // 开始调用 0 
        this.setState({ count: this.state.count + 1 }); 
        console.log('count1', this.state.count); // count1 1 
        this.setState({ count: this.state.count + 1 }); 
        console.log('count2', this.state.count); // count2 2 
    }, 0); 
}
```

#### 连续多次 setState

> 只会更新最后一次

```js
componentDidMount() { 
    console.log('开始调用', this.state.count); // 开始调用 0 
    this.setState({ count: this.state.count + 1 }, () => {
        console.log('count1', this.state.count); // count1 1 
    }); 
    this.setState({ count: this.state.count + 1 }, () => {
        console.log('count2', this.state.count); // count2 1
    }); 
}
```

## setState 源码阅读

```
待看
```

## 源码阅读

> 地址: https://github.com/yunaichun/react-study

## 参考资料

- [React官方文档](https://reactjs.org)
- [React源码](https://github.com/facebook/react/tree/8b2d3783e58d1acea53428a10d2035a8399060fe)
- [凹凸实验室](https://aotu.io/notes/2020/11/12/react-indoor/index.html)
- [阿里知乎专栏](https://zhuanlan.zhihu.com/purerender)
- [React源码解析](https://react.jokcy.me/)
- [React技术揭秘](https://react.iamkasong.com/)
- [React内部原理](http://tcatche.site/2017/07/react-internals-part-one-basic-rendering/)
- [我对 React v16.4 生命周期的理解](https://juejin.cn/post/6844903655372488712)
- [React 原理之 setState 执行机制](https://www.studyfe.cn/2019/10/09/react/library-react-state/#toc-heading-7)
- [你真的理解 setState 吗？](https://juejin.cn/post/6844903636749778958#heading-5)
