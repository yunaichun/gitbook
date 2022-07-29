## 简介

> reduce 实现学习笔记。

## reduce 实现

```js
// == reduce 的思想是归并的思想
Array.prototype.fakeReduce = function (fn, initItem) {
    if (typeof fn !== 'function') throw new Error('argument[0] must be a function');

    const arr = this;
    const mergedArr = [...arr];
    if (initItem) mergedArr.unshift(initItem)

    let next;
    let index = 0;
    while(mergedArr.length > 1) {
        const prev = mergedArr[0];
        next = mergedArr[1];
        next = fn(prev, next, index, arr);
        index += 1;
        mergedArr.splice(0, 2, next);
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
