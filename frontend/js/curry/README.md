## 简介

> js 柯里化函数学习笔记。

## 柯里化函数

```js
function curry(fn, ...args) {
  if (args.length === 10) {
    return fn(...args);
  } else {
    return function(...args2) {
      return curry.apply(null, [fn].concat(args).concat(args2))
    }
  }
}


function add(...args) {
  return args.reduce((pre, cur) => pre + cur);
};
// 45
console.log(curry(add, 1, 2)(3)(4)(5)(6, 7, 8)(9)(0));
```

## 应用

#### bind函数

[bind函数](../bind/README.md)

#### 防抖与节流函数

[防抖与节流函数](../bind/README.md)

#### Thunk函数

[Thunk函数](../generator/README.md)
