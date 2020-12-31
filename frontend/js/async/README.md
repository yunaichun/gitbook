## 简介

> async 原理学习笔记。

## async 是什么

```text
1、内置执行器。

2、更好的语义。

3、更广的适用性。

4、返回值是 Promise。
```

```js 
// == async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
// == 所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。
async function fn(args) {
// ...
}

// == 等价于
function fn(args) {
    return spawn(function* () {
        // ...
    });
}
```

## spawn 函数实现

```js
function spawn(genFuc) {
    return new Promise(function(resolve, reject) {
        function run(genFuc) {
            let gen = genFuc();
            function resolve(data) {
                let result = gen.next(data);
                
                if (result.done) return result.value;
                
                // == 递归调用
                Promise.resolve(result.value)
                .then(function(value) {
                    resolve(value);
                }, function(reason) {
                    gen.throw(reason);
                });
            }
            resolve();
        }
        run(genFuc);
    });
}
```

## 参考资料

- [async 函数](https://es6.ruanyifeng.com/#docs/async#async-%E5%87%BD%E6%95%B0%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
