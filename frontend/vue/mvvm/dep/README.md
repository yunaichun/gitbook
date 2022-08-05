## 简介

> MVVM Dep 函数学习笔记。

## Dep 作用

```text
由前面2节可以知道 Observer 就是让数据属性有一个 __ob__ 的属性值等于 Observer 实例。

数据属性 __ob__.dep 的属性值等于 Dep 实例。

在数据取值的时候设置目标依赖，通过 __ob__.dep.depend() 完成目标依赖的收集，即收集到 Watcher 中的回调函数。

在数据设值的时候，通过 __ob__.dep.notify() 完成收集到的依赖的触发，即执行到 Watcher 中的回调函数。
```

## Dep 函数

```js
export default class Dep {
    static target;

    constructor() {
        this.subs = [];
    }

    // == 收集依赖: 触发 Watch 的 addDep 方法
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    // == Watch 的 addDep 方法调用 addSub，将当前的 Watch 实例传入
    addSub(sub) {
        this.subs.push(sub);
    }

    // == 设置值的时候触发依赖：调用 Watch 实例的 update 方法
    notify(newVal) {
        for(let i = 0; i < this.subs.length; i++) {
            this.subs[i].update(newVal);
        }
    }
}
```

## pushTarget 函数

```text
通过在 Dep 的静态属性上设置目标依赖，实际相当于全局变量的设置。

Dep.target = Watcher       ->   
Watcher中取值               ->   
触发访问器属性               ->  
Dep.target.addDep(Dep)     -> 
Watcher.addDep(Watcher)    ->
Dep.addSub(Watcher)        ->    最终将 Dep 的 subs 属性收集到 Watcher 的实例
```

```js
// == 设置观察者对象
export const pushTarget = function(_target) {
    Dep.target = _target;
}

```
## 项目地址

地址: https://github.com/yunaichun/vue-study/tree/master/mvvm-simple

## 参考资料

- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
