## 简介

> js 柯里化函数学习笔记。

## 柯里化函数

```js
// == 柯里化函数: 即函数内部返回函数
function curry(fn, ...args) {
    if (args.length === 10) {
        return fn.apply(this, args);
    } else {
        // == 返回函数: 拼接此函数的参数，同时递归调用 curry 函
        return function(...args2) {
            return curry.call(this, fn, ...args.concat(args2));
        }
    }
}

function add(...args) {
    return args.reduce((pre, cur) => pre + cur);
};
// == 45
console.log(curry(add, 1, 2)(3)(4)(5)(6, 7, 8)(9)(0));
```

## 应用

#### bind函数

[bind函数](../bind/README.md)

#### 防抖与节流函数

[防抖与节流函数](../bind/README.md)

#### Thunk函数

[Thunk函数](../generator/README.md)

## 参考资料

- []()
