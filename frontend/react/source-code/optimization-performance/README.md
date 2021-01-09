## 简介

> React 性能优化学习笔记。

## Class Component 性能优化

#### shouldComponentUpdate

**作用**

```
1、可以比较 state 和 props 前后的值决定是否更新。

2、返回 true 则更新，否则不更新；可以减少重新 render 的次数
```

**示例**

```js
import React from "react";

export default class ShouldComponentUpdateUsage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value1: '渲染在页面中的值',
      value2: '不会渲染在页面中的值'    
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({value2: '随便怎么改，不会重新 render'});
    }
  }        
  shouldComponentUpdate(nextProps, nextState) {
      // == 只有 value1 改变才会重新渲染，无视 value2 是否改变
      if(nextState.value1 != this.state.value1) {
        return true;
      }
      return false;
  }
  render() {
    return <div>{this.state.value1}</div>
  }
}
```

#### PureComponent

**本质**

```
1、组件自动执行一次 shallowEqual，默认会做一层浅比较。

2、相当于省去了写 shouldComponentUpdate 函数。
```

**存在问题**

```
1、由于只会做一层浅比较，所以如果 state 存在嵌套对象的话，假如我们修改此嵌套对象为之前的那个对象，结果也会重新渲染，因为对象的引用改变了。

2、由于只会做一层浅比较，所以如果 props 存在嵌套数组的话，假如 props 改变了，由于数组是引用传递的，所以前后的 props 不变，会造成不会渲染。
```

#### Immutable.js 不可变数据

**immutable data structures（持久性数据结构）**

```
1、数据一旦创建，就不能再被更改，任何修改或添加删除操作都会返回一个新的 Immutable 对象。

2、相比 js，浅拷贝引用类型会共享地址、深拷贝浪费性能。
```

**structural sharing（结构共享）**

```
1、结构共享是指没有改变的数据共用一个引用，这样既减少了深拷贝的性能消耗，也减少了内存。

2、当我们对一个 Immutable 对象进行操作的时候，Immutable.js 只修改该节点以及它的祖先节点，其他保持不变，这样可以共享相同的部分，大大提高性能。
```

**示例**

```js
var obj = {
  count: 1,
  list: [1, 2, 3, 4, 5]
}
var map1 = Immutable.fromJS(obj);
var map2 = map1.set('count', 2);

// == 一旦创建不可更改，任何更改都会生成一个新的 Immutable 对象
console.log(map1 === map2); // == false
// == 没修改的部分结构共享
console.log(map1.list === map2.list); // == true
```

#### PureComponent 与 Immutable.js 结合

**优点**

```
1、使用 PureComponent：不用写 shouldComponentUpdate 函数了

2、使用 Immutable.js：state 存在嵌套对象且被修改为之前一样的 Immutable 对象 也不会重新渲染了；props 引用类型的修改，也会重新渲染了；
```

**正确姿势**

```
1、在非 render 里全部使用 Immutable 数据结构。

2、在 render 里将需要到的 Immutable 数据转换为浏览器可以解析的 js 数据。
```

## Function Component 性能优化

#### React.memo
**作用**

```
1、如果传递的 props 不变为则不会更新子组件，默认只会做一层浅比较

2、返回 true 则不更新，否则更新；减少重新 render 的次数
```

**示例**

```js
function MyComponent(props) {
  // == 使用 props 渲染
}
function areEqual(prevProps, nextProps) {
  // == 在这里可以比较 nextProps 与 prevProps，默认会做一层浅比较
  // == 返回 true 则不更新，返回 false则更新
}
React.memo(MyComponent, areEqual);
```

#### React.useCallback

**示例**

```js
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

function Child(props) {
  return <button onClick={props.onClick}>点击</button>；
}

function App() {
  const [parent, setParent] = useState('不会传递给子组件的值');

  const callback = () => {
    console.log(1111);
  };
  
  return (
    <div className="App">
      <div>{parent}</div> 
      <button onClick={() => setParent('changed')}>改值</button>
      <Child onClick={callback} name="桃桃" />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
```

**解释**

```
1、在函数式组件里每次重新渲染，函数组件都会重头开始重新执行

2、两次创建的函数肯定发生了改变，所以导致了子组件重新渲染

3、通过 useCallback 避保持函数改变
const callback = useCallback(() => {
  console.log(1111);
}, []);
```

#### React.useMemo

**作用**

```
1、第一个参数就是一个函数，返回的值会被缓存起来，同时这个值会作为 useMemo 的返回值；减少计算的量

2、第二个参数是数组依赖，如果数组里面的值有变化，那么就会重新执行第一步
```

**示例**

```js
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

## Suspense 和 lazy 懒加载组件

```js
import React, { lazy, Suspense } from "react";

export default class CallingLazyComponents extends React.Component {
  render() {
    let ComponentToLazyLoad = null;

    if(this.props.name == 'component 1') { 
      ComponentToLazyLoad = lazy(() => import('component1'));
    } else if(this.props.name == 'component 2') {
      ComponentToLazyLoad = lazy(() => import('component2'));
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ComponentToLazyLoad />
        </Suspense>
    );
  }
}
```

## 参考资料

- [React 灵魂 23 问，你能答对几个？](https://zhuanlan.zhihu.com/p/304213203)
- [React 函数式组件性能优化指南](https://zhuanlan.zhihu.com/p/137302815)
- [烤透 React Hook](https://juejin.cn/post/6867745889184972814)
- [21 个 React 性能优化技巧](https://www.infoq.cn/article/KVE8xtRs-uPphptq5LUz)
- [React.PureComponent 配上 ImmutableJS 才更有意义](https://juejin.cn/post/6844903501592526855)
