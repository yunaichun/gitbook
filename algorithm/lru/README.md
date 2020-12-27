## 简介

> 算法-LRU学习笔记。

## LRU 实现

leetcode: https://leetcode.com/problems/lru-cache

```js
class LRUCache {
    // == 存储最大长度
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    // == 获取 key 的 value
    get(key) {
        if(!this.cache.has(key)) return -1;
        // == find key and put first
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    // == 设置 key 和 value
    put(key, value) {
        if (this.cache.get(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if(this.cache.size > this.capacity) {
            const keys = this.cache.keys();
            const firstKey = keys.next().value;
            this.cache.delete(firstKey);
        }
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
