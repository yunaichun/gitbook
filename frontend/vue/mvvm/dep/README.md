## 简介

> MVVM Dep 函数学习笔记。

## Dep 作用

```text
1、depend 方法调用了 Dep.target (Watcher 实例) 的 addDep 方法，传入了 Dep 实例

2、Watcher 实例 addDep 方法，调用了 Dep 的 addSub方法，传入了 Watcher 实例

两次次互相调用，目的是完成 Watcher 实例的隐式收集，使用方无需传递且无感知
```

## Dep 函数

```js
/** 依赖收集函数: Dep.target 存入的是 Watch 实例 */
export default function Dep () {
  this.subs = [];
}
/** 收集依赖: 触发 Watch 的 addDep 方法 */
Dep.prototype.depend = function () {
  if (Dep.target) Dep.target.addDep(this);
}
/** Watch 的 addDep 方法调用 addSub，将当前的 Watch 实例传入 */
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}
/** 设置值的时候触发依赖：调用 Watch 实例的 update 方法 */
Dep.prototype.notify = function (newVal) {
  for(let i = 0; i < this.subs.length; i += 1) {
    this.subs[i].update(newVal);
  }
}
```

## pushTarget 函数

```text
将 Dep.target 设置为传入的 Watcher 实例
```

```js
/** 设置观察者对象 */
export function pushTarget (target) {
  Dep.target = target;
}
```

## 项目地址

地址: https://github.com/yunaichun/vue-study/tree/master/mvvm-simple

## 参考资料

- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
