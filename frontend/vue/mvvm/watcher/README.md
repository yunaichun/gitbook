## 简介

> MVVM Watcher 函数学习笔记。

## Watch 函数

```text
1、通过 pushTarget 将当前 Watcher 实例设置为 Dep.target

2、通过 this.get 完成属性的取值，即完成依赖的收集
```

```js
/** 数据监听函数 */
export default function Watch(data, exp, cb) {
  this.data = data;
  this.exp = exp;
  this.cb = cb;

  this.getter = parsePath(exp);
  this.value = this.get();
}
/** 取值触发依赖收集 */
Watch.prototype.get = function () {
  /** 1、设置 Dep.target */
  pushTarget(this);
  /** 2、对 data 取值，触发依赖收集 */
  const value = this.getter(this.data);
  return value;
}
/** 收集依赖: Dep 的 depend 方法会调用 */
Watch.prototype.addDep = function (dep) {
  /** 调用 Dep 的 addSub 方法，将当前的 Watch 实例传入 */
  dep.addSub(this);
}
/** 设置值触发收集的依赖 */
Watch.prototype.update = function (newVal) {
  const oldVal = this.value;
  this.cb(newVal, oldVal);
}
```

## 解析对象属性

```js
/** 根据 path 中的 . 获取 obj 的层级 value */
function parsePath(path) {
  const bailRE = /[^\w.$]/;
  if (bailRE.test(path)) return;
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i += 1) {
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

- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
