## 简介

> bind 实现学习笔记。

## call 实现

```js
Function.prototype.fakeCall = function(context, ...args) {
    // == 传入 null 和 undefined均 指向 window
    context = context || window;
    context.fn = this;

    let result = context.fn(...args);
    delete context.fn;

    return result;
}

const bar = function(name, age) {
    return  {name, age};
};
const obj = { value: 1 };

// == 1、传入null
console.log(bar.fakeCall(null));
// == 2、有返回值
console.log(bar.fakeCall(obj, 'kevin', 18));
```

## apply 实现

```js
Function.prototype.fakeApply = function (context, arr) {
    // == 传入 null 和 undefined均 指向 window
    context = context || window;
    context.fn = this;

    result = context.fn(...arr);
    delete context.fn;

    return result;
}

const bar = function(name, age) {
    return  {name, age};
};
const obj = { value: 1 };

// == 1、传入null
console.log(bar.fakeApply(null));
// == 2、有返回值
console.log(bar.fakeApply(obj, ['kevin', 18]));
```

## bind 实现

```js
Function.prototype.fakeBind = function(context, ...args) {
    if (typeof this !== 'function') {  
        throw new Error('when use bind, it must be a function');
    }

    let self = this;

    let resultFuc = function(...args2) {
        const current = this instanceof self ? this : context;
        self.apply(current, args.concat(args2));
    }

    // == resultFuc.prototype 的原型是 self.prototype
    // == 即 resultFuc 原型的原型是 self.prototype
    resultFuc.prototype = Object.create(self.prototype);
    return resultFuc;
}

let foo = { value: 1 };
function bar(name, age) {
    console.log(this.value);
    this.name = name;
    this.age = age;
}
bar.prototype.friend = 'friend';

// == 1、普通函数: bar.apply(foo, ['name1', 10])
let bind1 = bar.fakeBind(foo, 'name1');
let obj1 = bind1(10); // == undefined 【普通函数执行没有返回任何数据】

// == 2、构造函数: bar.apply(obj2, ['name1', 10])
let bind2 = bar.fakeBind(foo, 'daisy');
let obj2 = new bind2('name2');
console.log(obj2.__proto__.__proto__ === bar.prototype);
```

## 应用

#### call 函数示例

```js
let arr = [' ab', ' c d'];
console.log(arr.map(Function.prototype.call, String.prototype.trim));

// == 1、map 方法: 第二个参数相当于 obj 对象调用第一个函数
var arr = [' ab', ' c d'];
var obj = { 'test': 'test' }
arr.map(function(item) {
    // == obj
    console.log(this);
}, obj);

//  == 2、以遍历到第一个元素为例
Function.prototype.call.call(String.prototype.trim, ' ab');
// == 等价于
String.prototype.trim.call(' ab');
// == 等价于
' ab'.trim();
```

#### bind 函数示例一

```js
let bindf = Function.prototype.call.bind(Array.prototype.slice);
bindf([1, 2, 3]);

// == 等价于
Function.prototype.call.apply(Array.prototype.slice, [1, 2, 3])
// == 等价于
Array.prototype.slice.call([1, 2, 3])
// == 等价于
[1, 2, 3].slice()
```

#### bind 函数示例二

```js
let x = 10;
let y = function() {
    console.log(this.x);
};
let obj1 = { x: 100 };
let obj2 = { x: 2 };
let obj3 = { x: 3 };
func = y.bind(obj1).bind(obj2).bind(obj3);
func();
// == 等价于
(y.bind(obj1).bind(obj2)).apply(obj3);
// == 等价于
((y.bind(obj1)).apply(obj2)).apply(obj3);
// == 等价于
((y.apply(obj1)).apply(obj2)).apply(obj3);
```
