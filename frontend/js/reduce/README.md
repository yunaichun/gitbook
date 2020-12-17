## 简介

> reduce 原理学习笔记。

## reduce 原理

```js
// == reduce 的思想是归并的思想
Array.prototype.fakeReduce = function(fn, initialValue) {
    if (typeof fn !== 'function') { 
        throw new Error('argument[0] must be a function');
    }

    let initialArr = this;

    let arr = this.slice();
    if (initialValue) arr.unshift(initialValue);

    let next;
    while (arr.length > 1) {
        let [prev, curr] = [arr[0], arr[1]];
        let index = initialArr.length - arr.length + 1;
        next = fn.call(null, prev, curr, index, initialArr);
        arr.splice(0, 2, next);
    }

    return next;
};

let arr = [1, 2, 3, 4, 5];
let sum = arr.fakeReduce((prev, cur, index, arr) => {
    console.log(prev, cur, index, arr);
    return prev + cur;
}, 100);
console.log(sum);
```

## 归并思想实现斐波那契数列

```js
function* dncFib() {
    let prev = 1;
    let curr = 1;
    while(true) {
        yield prev;
        [prev, curr] = [curr, prev + curr];
    }
}
```

## 参考资料

- [javascript中reduce的应用和实现](https://segmentfault.com/a/1190000021242814)
