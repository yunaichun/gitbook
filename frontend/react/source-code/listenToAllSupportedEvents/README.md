
 ## 简介

> React - listenToAllSupportedEvents 源码阅读学习笔记。

## listenToAllSupportedEvents 流程

- 图片地址: https://www.processon.com/view/link/5f9779d37d9c0806f290f54c

 <iframe  
 height=1400 
 width=100% 
 src="https://www.processon.com/view/link/5f9779d37d9c0806f290f54c"  
 frameborder=0  
 allowfullscreen>
 </iframe>

## 原生事件事件流

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

## 阻止事件冒泡

```text
1、原生事件 stopPropagation
原生事件中如果执行了 stopPropagation 方法，则会导致其他 React 事件失效。因为所有元素的事件将无法冒泡到 document 上。

2、合成事件 stopPropagation
会阻止冒泡到 document 绑定的事件，但是不会阻止原生事件的冒泡。
```

## cloneNode 不会拷贝合成事件

**项目背景: swiper 轮播会 clone 节点，但是不会将 react 绑定的合成事件绑定到克隆的 node 上**

```js
// == 按需加载
useEffect(() => {
    import('swiper').then((fileData) => {
        setFileData(fileData);
    });
}, []);

// == 根据 __reactEventHandlers 找到 elem 绑定的 react 事件
const findEventHandlers = (elem) => {
    for (const key of Object.keys(elem)) {
        if (key.indexOf('__reactEventHandlers') > -1) return elem[key];
    }
}

// == 根据 swiper 的 index 找到 cloneNode 对应的初始 node
const findTargetSlideByIndex = (slides, index) => {
    for (let i = 0, n = slides.length; i < n; i++) {
        const slide = slides[i];
        const handlers = findEventHandlers(slide);
        if (handlers && slide.dataset.swiperSlideIndex === index) return slide;
    }
}

// == node: cloneNode 生成的节点
// == targetNode: swiper 通过 react 初始生成的 node 节点
const cycleBindEvent = (node, targetNode) => {
    // == 1、绑定当前节点
    const handlerTree = findEventHandlers(targetNode);
    if (handlerTree && handlerTree.onClick) {
        node.onclick = handlerTree.onClick;
    }
    // == 2、循环绑定子节点
    if (node.childNodes && node.childNodes.length) {
        for (let i = 0, n = node.childNodes.length; i < n; i++) {
            const childNode = node.childNodes[i];
            const targetChildNode = targetNode.childNodes[i];
            cycleBindEvent(childNode, targetChildNode);
        }
    }
}

useEffect(() => {
    if (!fileData) return;
    const swiper = new fileData.default(ref.current, config);
    if (!swiper.slides) return;
    for (let i = 0, n = swiper.slides.length; i < n; i++) {
        const slide = swiper.slides[i];
        const handlersTree = findEventHandlers(slide);
        // == 含有 __reactEventHandlers 属性: swiper 通过 react 初始生成的 node 节点
        if (handlersTree) continue;
        // == 不含有 __reactEventHandlers 属性: cloneNode 生成的节点
        // == 找到绑定对应的 __reactEventHandlers 事件
        const targetSlide = findTargetSlideByIndex(swiper.slides, slide.dataset.swiperSlideIndex);
        cycleBindEvent(slide, targetSlide);
    }
}, [fileData]);
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
- [探索 React 合成事件](https://juejin.cn/post/6897911576053940231)
