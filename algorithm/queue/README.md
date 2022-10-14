## 简介

> 算法-队列学习笔记。

## js 实现队列

```js
/**
 * 先进先出
 */
function Queue() {
  this.queue = [];
}
Queue.prototype.enqueue = function (item) {
  this.queue.push(item);
};
Queue.prototype.dequeue = function () {
  return this.queue.shift();
};
Queue.prototype.front = function (item) {
  return this.queue[0];
};
```

## 数组第 K 大元素

- https://leetcode.cn/problems/kth-largest-element-in-a-stream

```js
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.minHeap = nums.sort((a, b) => b - a);
  this.k = k;
};

KthLargest.prototype.add = function (val) {
  let pos = this.minHeap.length;
  for (let i = 0; i < pos; i++) {
    if (val >= this.minHeap[i]) {
      pos = i;
      break;
    }
  }
  this.minHeap.splice(pos, 0, val);
  return this.minHeap[this.k - 1];
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
