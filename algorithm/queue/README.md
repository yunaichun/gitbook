## 简介

> 算法-队列学习笔记。

## js 实现队列

```js
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

## 滑动窗口最大值

- 单调递减队列: https://leetcode.cn/problems/sliding-window-maximum/

```js
function maxSlidingWindow(nums, k) {
  if (k === 1) return nums;
  const deQueue = [];
  const results = [];
  for (let right = 0, len = nums.length; right < len; right += 1) {
    const current = nums[right];
    /** deQueue 维护一个单调递减队列 */
    while (deQueue.length && current > deQueue[deQueue.length - 1]) {
      deQueue.pop();
    }
    deQueue.push(current);

    const left = right - k + 1;
    if (left >= 0) {
      results.push(deQueue[0]);
      /** 滑动过程中，窗口内最左边元素是单调递减队列最大值的话，则移除 */
      if (nums[left] === deQueue[0]) deQueue.shift();
    }
  }
  return results;
}
```

## 最小覆盖子串

- 单调递减队列: https://leetcode.cn/problems/minimum-window-substring/

```js

```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
