## 简介

> Generator 自动管理流程学习笔记。

## Generator-Thunk函数

#### Thunk函数定义

```js
1、编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，
再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

2、在 JavaScript 语言中，Thunk 函数替换的不是表达式，
而是多参数函数，将其替换成单参数的版本。
```

#### Thunk函数实现

```js
var Thunk = function(fn) {
    return function(...args) {
        return function(callback) {
            return fn.call(this, ...args, callback);
        };
    };
};
```

#### Thunk函数案例

```js
let fs = require('fs');
let readFile = Thunk(fs.readFile);

let genFuc = function* () {
    let f1 = yield readFile('file1');
    let fn = yield readFile('fileN');
};
```

#### 执行流程分析

```js
let g = genFuc();
let r1 = g.next();

// == r1.value 是 yield 执行后的值: thunk 函数传入 callback 
r1.value(function(err, data) {
    if (err) throw err;
    let r2 = g.next(data);
    r2.value(function(err, data) {
        if (err) throw err;
        g.next(data);
    });
});
```

#### 自动执行流程

```js
function run(genFuc) {
    let gen = genFuc();
    function callback(err, data) {
        let result = gen.next(data);
        if (result.done) return;
        result.value(callback);
    }
    callback();
}
run(genFuc);
```

## Generator-Promise对象

#### Promise对象案例

```js
let fs = require('fs');
let readFile = function(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

let genFuc = function* () {
    let f1 = yield readFile('file1');
    let fn = yield readFile('fileN');
};
```

#### 执行流程分析

```js
let g = genFuc();
let r1 = g.next();

// == r1.value 是 yield 执行后的值: promise 函数执行 then 回调 
r1.value.then(function(data) {
    let r2 = g.next(data);
    r2.value.then(function(data) {
        g.next(data);
    });
});
```

#### 自动执行流程

```js
function run(genFuc) {
	let gen = genFuc();
	function thenback(data) {
		let result = gen.next(data);
		if (result.done) return result.value;
		result.value.then(function(data) {
			thenback(data);
		});
	}
	thenback();
}
run(genFuc);
```

## Generator注意点

```text
1、执行g.next(): 得到的是 yield 后面的值

2、执行g.next(value): 会将上一步 yield 后面的值设置为 value

3、执行g.return(value): 得到结果为 { value, done: true }


4、Generator 函数是遍历器函数，执行 Generator 函数会生成遍历器对象；遍历器对象具有遍历器接口如下；
例: function* numbers() { yield 1; yield 2; return 3; yield 4; }

扩展运算符: [...numbers()] // [1, 2]

Array.form 方法: Array.from(numbers()) // [1, 2]

解构赋值（不需要调用next方法）: let [x, y] = numbers(); // 1 2

for...of 不需要调用next方法）: for (let n of numbers()) { console.log(n); } // 1 2


5、某对象的 Symbol.iterator 属性为遍历器函数，则 该对象 变为遍历器对象，具有遍历器接口。例：
function* gen() {}
let g = gen(); // g 为遍历器对象
g[Symbol.iterator] === gen
g[Symbol.iterator]() === g


6、yield*：在一个 Generator 函数执行另一个 Generator 函数，yield* 后面跟遍历器对象。
```

## 斐波那契数列

#### generator函数实现

```js
function* dycFib() {
    let prev = 1
    let curr = 1
    // == 每次遍历返回的是yield后面的值：即prev的值
    while (true) {
        yield prev; 
        // == 变量结构赋值
        [prev, curr] = [curr, prev + curr];
    }
}
```

#### 动态规划实现

```js
function dycFib(n) {
    var arr = [];
    arr[0] = 1;
    arr[1] = 1;
    for (var i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n - 1];
}
```

#### 递归实现

```js
function fib(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}
```

## 参考资料

- [es6 javascript 的Generator 函数 （下）](https://blog.csdn.net/qq_30100043/article/details/53484350)
- [进阶 Javascript 生成器](https://juejin.cn/post/6844903527039533064)
- [Thunk 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/thunk.html)
- [co 函数库的含义和用法](http://www.ruanyifeng.com/blog/2015/05/co.html)
- [走一步再走一步，揭开 co 的神秘面纱](https://juejin.cn/post/6844903478322528264)
