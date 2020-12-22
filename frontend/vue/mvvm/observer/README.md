## 简介

> MVVM observer 函数学习笔记。

## observer 函数

```text
observer 函数主要是返回 Observer 实例

同时可知数组或对象均有 __ob__ 属性

而基本类型数据没有  __ob__ 属性
```

```js
export function observer(data) {
    if(data == null || typeof data !== 'object') {
        return;
    }

    // == 数组或对象均有 __ob__ 属性
    let ob;
    if (Object.prototype.hasOwnProperty.call(data, '__ob__')) {
        ob = data.__ob__;
    } else {
        ob = new Observer(data);
    }
    return ob;
}
```

## Observer 构造函数

#### 核心逻辑

```text
Observer 主要做了两件事
1、data.__ob__ = new Observer(data);

2、data.__ob__.dep = new Dep();
后面我们可以知道
当前 val 为对象或数组时，依赖由当前 val 的 __ob__.dep 收集
当前 val 为数组时，子项为对象或数组的话，依赖由当前 val 的子项的 __ob__.dep 收集

3、通过 walk 方法，保证对象的每一个 key 的 value 都有 __ob__ 属性

4、通过 observeArray 方法，保证数组的每一个 item 都有 __ob__ 属性

5、通过 protoAugment 方法，重写了数组的 7 个方法
```

#### Observer函数主体

```js
import { arrayMethods } from './array';
export class Observer {
    constructor(data) {
        this.dep = new Dep();
        
        // == 数组或对象均有 __ob__ 属性
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });

        if (!Array.isArray(data)) {
            this.walk(data);
        } else {
            // == 重写数组操作方法：目的是在调用数组方法的时候可以触发收集的依赖
            protoAugment(data, arrayMethods);
            // == 遍历数组每一项调用 observer 
            this.observeArray(data);
        }
    }
    
    // == 对象响应式处理: 保证对象的每一个 key 的 value 都有 __ob__ 属性
    walk(data) {
        let keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            defineReactive(data, keys[i], data[keys[i]]);
        }
    }

    // == 数组响应式处理: 保证数组的每一个 item 都有 __ob__ 属性
    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observer(items[i])
        }
    }
}

// == target 继承 src
function protoAugment(target, src) {
    target.__proto__ = src;
}
```

#### 重写数组方法

```text
此处我们可以看到重写数组的 7 个方法，实际还是调用数组的那 7 个方法

只不过在调用之后，我们通过 val.__ob__.dep.notify(this) 方法触发了收集的依赖

下面我们看看 defineReactive 函数中是如何完成对数组的依赖收集的
```

```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

;[
    'push',
    'pop', 
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
.forEach(function(method) {
    Object.defineProperty(arrayMethods, method, {
        value: function(...args) {
            const result = arrayProto[method].apply(this, args);
            const ob = this.__ob__;

            let inserted;
            switch (method) {
                // == 添加元素
                case 'push':
                case 'unshift':
                    inserted = args; 
                    break;
                // == 替换元素
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }
            // == 对新添加进数组的数据进行检测
            if (inserted) ob.observeArray(inserted);

            // == dep 对象通知所有的观察者
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
dep.depend() 实际是收集 Watch 实例，dep.notify(newVal) 为触发 Watch 实例上的 update 方法，后面章节我们会讲到。

1、通过当前函数作用域内的 Dep 实例完成 val 为基本数据类型（非对象或数组）的依赖收集

2、当前 val 为对象或数组时，依赖由当前 val 的 __ob__.dep 收集

3、当前 val 为数组时，子项为对象或数组的话，依赖由当前 val 的子项的 __ob__.dep 收集
```

```text
其次发现 defineReactive 本质是将 data 的普通属性变为访问器属性。

在取值的时候完成依赖的收集。由此可知我们在初始实例化 Watch 对象的时候，会完成对监听数据的取值，以便触发依赖收集。

在设置值的时候完成依赖的触发。由此可知我们在设置已经实例 Watch 的对象属性值的时候，触发收集到的依赖的执行。
```

#### defineReactive函数主体

```js
import Dep from './dep';

export function defineReactive(data, key, val) {
    // == 1、完成 val 为基本数据类型（非对象或数组）的依赖收集
    let dep = new Dep();
    
    // == 2、这一步可知数组或对象有一个 __ob__.dep 的属性，完成 val 为对象或数组的依赖收集
    let childObserverInstance = observer(val);

	Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            // == 依赖对象已经设置好，开始收集依赖
            if (Dep.target) {
                dep.depend();
                // == 当前 val 是对象或数组的话: { w: 1 }、[ 1 ]
                if (childObserverInstance) {
                    // == 2、由此可以看出当前 val 为对象或数组时，依赖由当前 val 的 __ob__.dep 收集
                    childObserverInstance.dep.depend();
                    // == 3、由此可以看出当前 val 为数组时，子项为对象或数组的话，依赖由当前 val 的子项的 __ob__.dep 收集
                    if (Array.isArray(val)) {
                        dependArray(val);
                    }
                }
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            childObserverInstance = observer(newVal);
            // == 触发收集的依赖
            dep.notify(newVal);
        }
    });
}
```

#### dependArray函数主题

```text
1、从 defineReactive 函数里可以看出当前 val 为数组时，会遍历进入到 dependArray 函数中

2、如果 val 为数组的话，通过 let childObserverInstance = observer(val) 可知数组的每一个 item （非基本类型）均具有 __ob__ 属性了

3、dependArray 的逻辑则是对数组的 item 为数组或对象时进行依赖收集

4、通过上面介绍的重写数组那里可知，当执行数组的那 7 个方法的时候，均会触发收集依赖的执行

5、由此我们看到对象虽然在这里被依赖收集了，但是却没有像数组那样对添加属性删除属性等操作时触发依赖的执行

Vue 当中的做法是通过 this.$set、this.$del  对对象属性的添加和删除做响应式处理的

拿 this.$set 举例，即首先通过 defineReactive 方法设置新属性为响应式，同时通过 __ob__.dep.notify() 触发此对象依赖的执行
```

```js
// == 递归对数组子项的依赖收集
function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}
```

## 项目地址

地址: https://github.com/yunaichun/vue-study/tree/master/mvvm-simple

## 参考资料

- [JavaScript 实现 MVVM 之我就是想监测一个普通对象的变化](http://hcysun.me/2016/04/28/JavaScript实现MVVM之我就是想监测一个普通对象的变化/)
- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
