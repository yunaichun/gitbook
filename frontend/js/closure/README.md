## 简介

> js 闭包学习笔记。

## 定义

```text
在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，
当通过调用一个外部函数返回一个内部函数后，
即使该外部函数已经执行结束了，
但是内部函数引用外部函数的变量依然保存在内存中，
我们就把这些变量的集合称为闭包。

比如下面外部函数是 f1，变量 n 就称为 f1 函数的闭包。
```

## 特点

```js
// == 1、函数外部可以访问函数内部变量
// == 2、变量值始终保存在内存中
function f1() {
    const n = 999;
　　 function f2() {
        console.log(n);
　　 }
　　 return f2;
}
var result = f1();
result();
```

## 几种方式

#### 返回函数

```js
var name = 'window作用域';   
var object = {
    name: '对象作用域',
    getNameFunc: function() {
        return function() {
            return this.name;
        };
    }
};
var getNameFunc = object.getNameFunc();
console.log(getNameFunc()); // 'window作用域'
```

#### 返回对象

```js
function create_counter(initial){
    let x = initial || 0;
    return {
        inc: function(){
            x += 1;
            return x;
        }
    };
}
var c1 = create_counter();
console.log(c1.inc()); // 1
console.log(c1.inc()); // 2
```

#### 立即执行函数

```js
var a = 2;
var func = (function() {
    var a = 3;
    return function() {
        a++;
        console.log(a);
    };
})();
func(); // 4
func(); // 5
```

## 应用

#### 匿名函数保持对外部变量的引用

```js
// == 匿名函数保持对外部变量的引用, 可以用立即执行函数传入
// == (function(n){function(){return n*n;}})(i)
function count() {
    var arr = [];
    for(var i=1; i<=3; i++) {
        arr.push(function() {
            return i*i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];

console.log(f1()); // 16
console.log(f2()); // 16
```

#### 多参数函数变为单参数的函数
```js
// == 柯里化函数
function make_pow(n) {
    return function(x) {
        return Math.pow(x, n);
    };
}
var pow2 = make_pow(2);
var pow3 = make_pow(3);
console.log(pow2(5)); // 25
console.log(pow3(7)); // 343
```
