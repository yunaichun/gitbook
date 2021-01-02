## 简介

> React - beginWork 源码阅读学习笔记。

## 函数组件 beginWork 流程

#### 整体流程

- 图片地址: https://www.answera.top/frontend/react/source-code/beginWork/beginWork-Function.png
- 源文件地址: https://www.answera.top/frontend/react/source-code/beginWork/beginWork-Function.xmind

![beginWork-Function](./beginWork-Function.png)

#### 遍历逻辑

```
1、beginWork 主要作用是 reconcile 协调处理所有子节点；
传入当前工作单元 workInProgress 和 current；
返回下一个工作单元，即 workInProgress 第一个子节点 workInProgress.child。

2、beginWork 内部遍历顺序：
通过 current.child.sibling 依次处理了所有的子节点；
同时使每个子节点的 return 属性均指向父节点 current。

3、由此可以看到：
beginWork 是顶部向下一层一层处理，即为自上而下的广度优先。
```

## class 组件 beginWork 流程

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
