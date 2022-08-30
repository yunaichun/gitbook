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
/** async 函数的实现原理: 返回一个函数, 此函数将 Generator 函数作为参数，内置自动执行器 */
async function fn(args) { 
  //... 
}

/** 其中的 autoExecuter 函数就是自动执行器。等价于 */
function fn(args) {
  return autoExecuter(
    function* genFuc() {
      //...
    }
  );
}
```

## spawn 函数实现

```js
const autoExecuter = function(genFuc) {
  return new Promise(function(resolve, reject) {
    const run = function () {
      let gen = genFuc();
      const cycle = function (data) {
        const r = gen.next(data);
        if (r.done) resolve(r.value);
        else Promise.resolve(r.value).then(data => cycle(data), error => gen.throw(error)); 
      }
      cycle();
    }
    run();
  });
}
```

## 参考资料

- [async 函数](https://es6.ruanyifeng.com/#docs/async#async-%E5%87%BD%E6%95%B0%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
