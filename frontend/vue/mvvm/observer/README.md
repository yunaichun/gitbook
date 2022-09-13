## 简介

> MVVM observer 函数学习笔记。

## observer 函数

```text
1、observer 函数主要是返回 Observer 实例

2、同时可知数组或对象均有 __ob__ 属性
```

```js
/** 返回 Observer 实例对象 */
export function observer(data) {
  if(data == null || typeof data !== 'object') return;

  /** 数组或对象均有 __ob__ 属性 */
  let ob;
  if (Object.prototype.hasOwnProperty.call(data, '__ob__')) ob = data.__ob__;
  else ob = new Observer(data);

  return ob;
}
```

## Observer 构造函数

#### 核心逻辑

```text
Observer 主要做了以下几件事
1、保证数组和对象均有 __ob__ 属性
data.__ob__ = new Observer(data);
data.__ob__.dep = new Dep();

2、数组处理
通过 protoAugment 方法，重写了数组的 7 个方法，改值的时候触发收集的依赖
通过 observeArray 方法，让数组的每个 item 执行 observer 方法

3、对象处理
通过 walk 方法，将对象的基本属性改为访问器属性
value 为基本类型: get 方法里完成依赖收集；set 方法里触发收集的依赖 (通过内部 Dep 实例)
value 为数组类型: get 方法里完成依赖收集；数组 7 个方法调用的时候收集的依赖 (通过 value.__ob__.dep 属性)
value 为对象类型: get 方法里完成依赖收集；无触发更新依赖方法
```

#### Observer函数主体

```js
/** 数据添加 __ob__ 属性为 Observer 实例 */
function Observer(data) {
  this.dep = new Dep();
  Object.defineProperty(data, '__ob__', {
    value: this,
    enumerable: false,
    writable: true,
    configurable: true,
  });
  if (Array.isArray(data)) {
    /** 重写数组操作方法：目的是在调用数组方法的时候可以触发收集的依赖 */
    protoAugment(data, arrayMethods);
    /** 递归数组每个 item */
    this.observeArray(data);
  } else {
    this.walk(data);
  }
}
/** 遍历数组每一项调用 observer  */
Observer.prototype.observeArray = function (arr) {
  for (let i = 0, len = arr.length; i < len; i += 1) {
    observer(arr[i]);
  }
}
/** 对象响应式处理: 保证对象的每一个 key 的 value 都有 __ob__ 属性 */
Observer.prototype.walk = function (obj) {
  let keys = Object.keys(obj);
  for(let i = 0; i < keys.length; i += 1){
    const key = keys[i];
    defineReactive(obj, key, obj[key]);
  }
}

/** target 继承 src */
function protoAugment(target, src) {
  target.__proto__ = src;
}
```

#### 重写数组方法

```text
1、此处可以看到重写数组的 7 个方法，实际还是调用数组的那 7 个方法

2、只不过在调用之后，通过 val.__ob__.dep.notify(this) 方法触发了收集的依赖
```

```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method) {
  Object.defineProperty(arrayMethods, method, {
    value: function(...args) {
      const result = arrayProto[method].apply(this, args);
      const ob = this.__ob__;

      /** 对新添加进数组的数据进行检测 */
      let inserted;
      if (method === 'push' || method === 'unshift') inserted = args;
      else if (method === 'splice') inserted = args.slice(2);
      if (inserted) ob.observeArray(inserted);

      /** dep 对象通知所有的观察者 */
      ob.dep.notify(this);
      return result;
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
});

```

## defineReactive 函数

#### 核心逻辑

```text
1、value 为基本类型: get 方法里完成依赖收集；set 方法里触发收集的依赖 (通过内部 Dep 实例)

2、value 为数组类型: get 方法里完成依赖收集；数组 7 个方法调用的时候收集的依赖 (通过 value.__ob__.dep 属性)

3、value 为对象类型: get 方法里完成依赖收集；无触发更新依赖方法
```

#### defineReactive函数主体

```js
/** 将 data 的属性转换为访问器属性 */                                                                                              
export function defineReactive(data, key, val) {
  /** 1、完成 val 为基本数据类型（非【数组/对象】）的依赖收集 */
  let dep = new Dep();
  /** 2、【数组/对象】执行 observer 函数才会有返回 */
  let childObserverInstance = observer(val);
	Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        /** 通过当前函数内部的 dep 实例收集依赖 */
        dep.depend();
        /** 当前 val 是【数组/对象】的话: { w: 1 }、[ 1 ] */
        if (childObserverInstance) {
          /** 通过 val 的 __ob__.dep 收集依赖 */
          childObserverInstance.dep.depend();
          /** 收集数组的子项依赖 */
          if (Array.isArray(val)) dependArray(val);
        }
      }
      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      childObserverInstance = observer(newVal);
      /** 触发收集的依赖 */
      dep.notify(newVal);
    }
  });
}
```

#### dependArray函数主题

```text
1、item.__ob__ 有值，代表数组的 item 是数组或对象，收集依赖

2、数组的 item 是数组的话，递归 dependArray 收集依赖
```

```js
/** 递归对数组子项的依赖收集 */
function dependArray(arr) {
  for (let i = 0, len = arr.length; i < len; i += 1) {
    const item = arr[i];
    const ob = item && item.__ob__;
    if (ob) ob.dep.depend();
    if (Array.isArray(item)) dependArray(e);
  }
}
```

## 项目地址

地址: https://github.com/yunaichun/vue-study/tree/master/mvvm-simple

## 参考资料

- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
