## 简介

> React Hooks等性能优化学习笔记。

## 减少重新 render 的次数

#### React.memo

```text
1、作用
如果传递的 props 不变为则不会更新子组件

2、用法
function MyComponent(props) {
  /* 使用 props 渲染 */
}

function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}

React.memo(MyComponent, areEqual);

3、对比
如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。
这与 shouldComponentUpdate 方法的返回值相反。
```

#### React.useCallback

```
1、作用
避免 props 没有更新的情况，父组件渲染也会导致子组件重新渲染

2、原因
在函数式组件里每次重新渲染，函数组件都会重头开始重新执行，
那么这两次创建的 callback 函数肯定发生了改变，所以导致了子组件重新渲染。
```

#### shouldComponentUpdate

```js
// == 使用纯组件 PureComponent 作为基类
import React from "react";

export default class ShouldComponentUpdateUsage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "Mayank";
      age: 30,
      designation: "Architect";
    }
  }
  
  componentDidMount() {
    // == 这里即使组件中 designation 发生变化也不会影响应用的视图。
    setTimeout(() => {
      this.setState({
        designation: "Senior Architect"
      });
    }
  }
               
  shouldComponentUpdate(nextProps, nextState) {
      // == 这里即使组件中 designation 发生变化也不会影响应用的视图。
      if(nextState.age != this.state.age || netState.name = this.state.name) {
        return true;
      }
      return false;
  }
  
  render() {
    return (
      <div>
        <b>User Name:</b> {this.state.name}
        <b>User Age:</b> {this.state.age}
      </div>
    )
  }
}
```

#### PureComponent

```
只不过会在 render 之前帮组件自动执行一次shallowEqual（浅比较），来决定是否更新组件，浅比较类似于浅复制，只会比较第一层。

使用 PureComponent 相当于省去了写 shouldComponentUpdate 函数，

当组件更新时，如果组件的 props 和 state： 
1. 引用和第一层数据都没发生改变， render 方法就不会触发，这是我们需要达到的效果。
2. 虽然第一层数据没变（因为 setState 会生成一个新对象），但引用变了，就会造成虚拟 DOM 计算的浪费。
3. 第一层数据改变（js 中引用类型共享地址），但引用没变，会造成不渲染，所以需要很小心的操作数据。
```

#### Immutable.js

**immutable data structures（持久性数据结构）**

```
数据一旦创建，就不能再被更改，

任何修改或添加删除操作都会返回一个新的 Immutable 对象。

相比 js: 浅拷贝引用类型会共享地址、深拷贝浪费性能。
```

**structural sharing（结构共享）**

```
结构共享是指没有改变的数据共用一个引用，这样既减少了深拷贝的性能消耗，也减少了内存。

当我们对一个 Immutable 对象进行操作的时候，ImmutableJS基于哈希映射树(hash map tries)和 vector map tries，

只修改该节点以及它的祖先节点，其他保持不变，这样可以共享相同的部分，大大提高性能。
```

```js
var obj = {
  count: 1,
  list: [1, 2, 3, 4, 5]
}
var map1 = Immutable.fromJS(obj);
var map2 = map1.set('count', 2);

console.log(map1 === map2); // false
console.log(map1.list === map2.list); // true
```

#### PureComponent + Immutable.js

```
1、使用 Immutable.js，引用类型的修改，也会重新渲染了；其次不需要深拷贝浪费性能

2、使用 PureComponent，不用写 shouldComponentUpdate 函数了
```

## 减少计算的量

#### React.useMemo

```
1、作用
第一个参数就是一个函数，这个函数返回的值会被缓存起来，同时这个值会作为 useMemo 的返回值，
第二个参数是一个数组依赖，如果数组里面的值有变化，那么就会重新去执行第一个参数里面的函数，并将函数返回的值缓存起来并作为 useMemo 的返回值 。

2、原因
function expensiveFn() {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += i;
    }
    console.log(result)
    return result;
}

const base = useMemo(expensiveFn, []);
```

## Suspense 和 lazy 懒加载

```js
import React, { lazy, Suspense } from "react";

export default class CallingLazyComponents extends React.Component {
  render() {
    
    var ComponentToLazyLoad = null;
    
    if(this.props.name == "Mayank") { 
      ComponentToLazyLoad = lazy(() => import("./mayankComponent"));
    } else if(this.props.name == "Anshul") {
      ComponentToLazyLoad = lazy(() => import("./anshulComponent"));
    }
    return (
        <div>
            <h1>This is the Base User: {this.state.name}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ComponentToLazyLoad />
            </Suspense>
        </div>
    )
  }
}
```

## render函数尽可能少的处理

#### 使用 React Fragments 避免额外标记

```html
<!-- 代码没有额外的标记，因此节省了渲染器渲染额外元素的工作量。 -->
<>
    <h1>This is the Header Component</h1>
    <h2>Welcome To Demo Page</h2>
</>
```

#### 不要使用内联函数定义

```html
<!-- 当 React 进行虚拟 DOM diffing 时，它每次都会找到一个新的函数实例；因此在渲染阶段它会会绑定新函数并将旧实例扔给垃圾回收。 -->
<!-- 因此直接绑定内联函数就需要额外做垃圾回收和绑定到 DOM 的新函数的工作。 -->
<input type="button" onClick={this.setNewStateData} value="Click For Inline Function" />
```

#### 在 Constructor 早期绑定函数/箭头函数

```js
// == 每次调用 render 函数时都会创建并使用绑定到当前上下文的新函数，
// == 但在每次渲染时使用已存在的函数效率更高
constructor() {
  this.state = {
    name: "Mayank"
  }
  this.handleButtonClick = this.handleButtonClick.bind(this)
}
```

#### 使用唯一键迭代

```
Key不仅影响性能，更重要的作用是标识。随机分配和更改的值不算是标识。

我们得知道数据的建模方式才能提供合适的键值。如果你没有ID，我建议使用某种哈希函数生成ID。

我们在使用数组时已经有了内部键，但它们是数组中的索引。插入新元素时这些键是错误的。
```

#### 错误边界

```
static getDerivedStateFromError()

componentDidCatch()
```

## 参考资料

#### 知识概览

- [React 灵魂 23 问，你能答对几个？](https://zhuanlan.zhihu.com/p/304213203)

#### 基本知识

- [探索 React 合成事件](https://juejin.cn/post/6897911576053940231)
- [你真的理解 setState 吗？](https://juejin.cn/post/6844903636749778958#heading-5)
- [我对 React v16.4 生命周期的理解](https://juejin.cn/post/6844903655372488712)

#### Hooks 相关

- [React 函数式组件性能优化指南](https://zhuanlan.zhihu.com/p/137302815)
- [烤透 React Hook](https://juejin.cn/post/6867745889184972814)
- [21 个 React 性能优化技巧](https://www.infoq.cn/article/KVE8xtRs-uPphptq5LUz)
- [React.PureComponent 配上 ImmutableJS 才更有意义](https://juejin.cn/post/6844903501592526855)
#### 核心思想

- [React Fiber 是什么？](https://github.com/WangYuLue/react-in-deep/blob/main/02.React%20Fiber%20%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.md)
