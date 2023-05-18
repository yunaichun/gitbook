## 简介

> new 实现学习笔记。

## new 实现

```js
function fakeNew(object) {
    // == 1. 创建对象，同时设置该对象的 __proto__ 属性
    let obj = Object.create(object.prototype);
    // == 等价于
	// == let obj = {};
	// == obj.__proto__ = object.prototype;
    
    // == 2、执行构造函数中的代码（为这个对象添加属性和方法）
    let k = object.call(obj);
    // == 3、返回对象
	if (typeof k === 'object') {
		return k;
    }
    return obj;
}

let M = function(name) {
	this.name = name;
}
let obj = fakeNew(M);

console.log(obj instanceof M);
```

## instanceof 实现

```js
function fake_instance_of(left, right) { 
  let leftProto = left.__proto__;
  let rightProto = right.prototype;
  while (leftProto) {
    if (leftProto === rightProto) return true;
    leftProto = leftProto.__proto__;
  }
  return false;
}
```

## Object.create 与 new 的区别

```js
const a = { x: 1 };
const b = new Object(a);
console.log(b.__proto__ === Object.prototype);

const a = { x: 1 };
const c = Object.create(a);
console.log(c.__proto__ === a);
```

## 参考资料

- [JavaScript专题之模拟实现new](https://zhuanlan.zhihu.com/p/49210829)
