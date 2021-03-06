## 简介

> React 简易实现-Concurrent Mode学习笔记。

## 上一节存在问题

```text
由上节 render 函数可知，内部递归调用存在以下问题:

1、开始渲染后，直到渲染完完整的元素树后，我们才会停止。如果元素树很大，则可能会阻塞主线程太长时间。

2、而且，如果浏览器需要执行高优先级的操作（例如处理用户输入或保持动画流畅），则它必须等到渲染完成为止。
```

## 解决思路

```text
我们将工作分成几个小部分，在完成每个单元后，如果需要执行其他任何操作，我们将让浏览器中断渲染。

使用 requestIdleCallback 进行循环。可以将 requestIdleCallback 视为 setTimeout，但是浏览器将在主线程空闲时运行回调，而不是告诉它何时运行。

requestIdleCallback 还为我们提供了截止日期参数。我们可以使用它来检查浏览器需要再次控制之前需要多少时间。
```

## requestIdleCallback 代码逻辑

```js
let nextUnitOfWork = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  }
  // == 在未来的帧中继续执行
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

// == 不仅执行当前工作单元，同时返回下一个工作单元
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

## requestIdleCallback 存在缺陷

```text
requestIdleCallback 使用可参考 https://zhuanlan.zhihu.com/p/60189423

requestIdleCallback 的 FPS 只有 20, 这远远低于页面流畅度的要求！(一般 FPS 为 60 时对用户来说是感觉流程的, 即一帧时间为 16.7ms)。

这也是 React 需要自己实现 requestIdleCallback 的原因。

React 不再使用 requestIdleCallback 。React 使用 scheduler 包
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
