## 简介

> MVVM Watcher 函数学习笔记。

## Watch 函数

```text
先看下 Watch 构造函数被实例的时候做了什么操作：

1、首先通过 pushTarget 设置了依赖对象，在 Dep 讲解中可以知道即设置 Dep.target = new Watch

2、根据监听的具体属性完成对此属性的取值。由 observer 讲解中可知此时完成了对此属性依赖的收集，会触发 val.__ob__.depend()
```

```
后面讲解 Dep 可以知道依赖收集的流程
val.__ob__.depend() -> Dep.target.addDep(dep) -> Watch.addDep(dep) -> Dep.addSub(Watch)

后面讲解 Dep 可以知道依赖触发的流程
val.__ob__.notify() -> 循环执行 Watch.update -> this.cb【即为收集的回调函数】
```

```js
import { pushTarget } from './dep';

// == 数据监听函数
export default class Watch {
    constructor(data, exp, cb) {
        this.data = data;
        this.exp = exp;
        this.cb = cb;

        this.getter = parsePath(exp);
        this.value = this.get();
    }

    // == 取值触发依赖收集
    get() {
        // == 1、设置 Dep.target
        pushTarget(this);
        // == 2、对 data 取值，触发依赖收集
        const value = this.getter(this.data);
        return value;
    }

    // == 收集依赖: Dep 的 depend 方法会调用
    addDep(dep) {
        // == 调用 Dep 的 addSub 方法，将当前的 Watch 实例传入
        dep.addSub(this);
    }

    // == 设置值触发收集的依赖
    update(newVal) {
        const oldVal = this.value;
        this.cb(newVal, oldVal);
    }

}
```

## 解析对象属性

```js
// == 根据 path 中的 . 获取 obj 的层级 value
function parsePath(path) {
    const bailRE = /[^\w.$]/;
    if (bailRE.test(path)) {
        return;
    }
    const segments = path.split('.');
    return function(obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]];
        }
        return obj;
    }
}
```

## 项目地址

地址: https://github.com/yunaichun/vue-study/tree/master/mvvm-simple

## 参考资料

- [JavaScript 实现 MVVM 之我就是想监测一个普通对象的变化](http://hcysun.me/2016/04/28/JavaScript实现MVVM之我就是想监测一个普通对象的变化/)
- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
