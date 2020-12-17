## 简介

> js 实现深拷贝学习笔记。

## 递归实现深拷贝

```js
function extendDeep(parent, child) {
    if (!child) child = Array.isArray(parent[key]) ? [] : {};
    for (let key in parent) {
        if (parent.hasOwnProperty(key)) {
            if (typeof parent[key] === 'object') {
                child[key] = extendDeep(parent[key], Array.isArray(parent[key]) ? [] : {});
            } else {
                child[key] = parent[key];
            }
        }
    }
    
    return child;
}

let parent = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
let child = extendDeep(parent, {counts: [], c: 1});
child.counts.push(4);
console.log(child.counts, parent.counts);

child.reads.english = true;
console.log(child.reads, parent.reads); 
```

## Object.assign和扩展运算符

**引用类型的值会相互传递，是浅拷贝**

```js
const obj = { a: { b: 1}};
const obj2 = Object.assign(obj);
obj2.a.c = 1;
console.log(obj);

const obj3 = { ...obj };
obj3.a.c = 1;
console.log(obj);
```

## 参考资料

- [js浅拷贝与深拷贝方法](https://segmentfault.com/a/1190000016440069)
