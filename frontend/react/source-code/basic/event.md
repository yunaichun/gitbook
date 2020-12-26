## 简介

> React 合成事件学习笔记。

## 原生事件

```text
1. 事件捕获（此阶段时间监听函数不会触发）

2. 事件目标

3. 事件冒泡
```

## 原生事件与合成事件不同点

```text
1. 事件名称命名方式不同

2. 事件处理函数写法不同
原生事件处理函数写法: <button onclick="handleClick()">Leo 按钮命名</button>
React合成事件处理函数写法: <button onClick={handleClick}>Leo 按钮命名</button>

3. 阻止默认行为方式不同
原生事件阻止默认行为方式: return false
React事件阻止默认行为方式: e.preventDefault()
```

## 原生事件与合成事件执行顺序

```text
1、React 所有事件都挂载在 document 对象上；

2、当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件；

3、所以会先执行原生事件 -> 然后处理 React 事件 -> 最后真正执行 document 上挂载的事件。
```

## 事件阻止冒泡

#### stopPropagation

```text
1、原生事件 stopPropagation
原生事件中如果执行了 stopPropagation 方法，则会导致其他 React 事件失效。因为所有元素的事件将无法冒泡到 document 上。

2、合成事件 stopPropagation
会阻止冒泡到 document 绑定的事件，但是不会阻止原生事件的冒泡。
```

#### stopImmediatePropagation

```text
1、原生事件 stopImmediatePropagation
只能阻止绑定在 document 上的事件监听器。

2、合成事件 e.nativeEvent.stopImmediatePropagation
能阻止合成事件不会冒泡到 document 上。

3、举例
点击菜单内部，由于不冒泡，会正常执行菜单点击。
点击菜单外部，执行 document 上事件，关闭菜单。
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
