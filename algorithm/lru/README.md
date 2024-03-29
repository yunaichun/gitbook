## 简介

> 算法-LRU 学习笔记。

## LRU 实现

- https://leetcode.cn/problems/lru-cache

```js
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.map = new Map();
};

LRUCache.prototype.get = function(key) {
  if (!this.map.has(key)) return -1;
  const value = this.map.get(key);
  /** 一旦取值就放在最后面 */
  this.map.delete(key);
  this.map.set(key, value);
  return value;
};

LRUCache.prototype.put = function(key, value) {
  if (this.map.get(key)) this.map.delete(key);
  this.map.set(key, value);
  /** 删除先添加进来的，刚添加进来的放在最后面 */
  if (this.map.size > this.capacity) {
    const keys = this.map.keys();
    const firstKey = keys.next().value;
    this.map.delete(firstKey);
  }
};
```

## Map 用法

```js
var m = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

m.has("a"); // true

m.set("d", 4);

m.get("d"); // 4

m.delete("d");

m.size; // 3

m.keys().next(); // { value: 'a', done: false }
m.values().next(); // { value: 1, done: false }
m.entries().next(); // { value: ['a', 1], done: false }
m.forEach(function (value, key, map) {
  console.log(value, key, map);
}); // 3 'c' Map(3) {'a' => 1, 'b' => 2, 'c' => 3}

/** Map 转换成 Object */
var obj = Object.fromEntries(m.entries()); // {a: 1, b: 2, c: 3}
/** Object 转换成 Map */
var map = new Map(Object.entries(obj)); // Map(3) {'a' => 1, 'b' => 2, 'c' => 3}
```

## Set 用法

```js
var s = new Set([1, 2, 3]);

s.has(1); // true

s.add(4);

s.delete(4);

s.size; // 3

s.keys().next(); // {value: 1, done: false}
s.values().next(); // {value: 1, done: false}
s.entries().next(); // { value: [1, 1], done: false }
s.forEach(function (value, key, set) {
  console.log(value, key, set);
}); // 3 3 Set(3) {1, 2, 3}

/** Map 转换成 Array */
var arr = Array.from(s); // [1, 2, 3]
/** Array 转换成 Map */
var set = new Set(arr); // Set(3) {1, 2, 3}
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
- [系列博客](https://leetcode-solution-leetcode-pp.gitbook.io)
- [Map 和 Set](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024181109440)
