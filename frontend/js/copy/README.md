## 简介

> js 实现深拷贝学习笔记。

## 递归实现深拷贝

```js
function extendDeep(parent) {
  if (typeof parent !== 'object') return parent;
  let child = Array.isArray(parent) ? [] : {};
  for (const key in parent) {
    const value = parent[key];
    if (typeof value === 'object') {
      child[key] = extendDeep(value);
    } else {
      child[key] = value;
    }
  }
  return child;
}
const parent = {
  a: 1,
  b: {
    c: 2
  },
  d: [3, 4]
};
const child = extendDeep(parent);
console.log(child, parent);
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
