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

- leetcode: https://leetcode.cn/problems/kth-largest-element-in-a-stream

```js
var KthLargest = function(k, nums) {
  this.minHeap = nums.sort((a,b) => b - a);
  this.k = k;
};
KthLargest.prototype.add = function(val) {
  let index = this.minHeap.length;
  for (let i = 0; i < this.minHeap.length; i += 1) {
    if (val > this.minHeap[i]) {
      index = i;
      break;
    }
  }
  this.minHeap.splice(index, 0, val);
  return this.minHeap[this.k - 1];
}
```

## 滑动窗口最大值 (固定窗口)

- leetcode: https://leetcode.cn/problems/sliding-window-maximum/

```js
var maxSlidingWindow = function(nums, k) {
  /** 结果 */
  const results = [];
  /** 定义窗口比较值: 单调递减队列的下标 */
  const deque = [];
    /** 初始化窗口边界 */
  let [left, right] = [0, 0];

  for (; right < nums.length; right++) {
    left = right - k + 1;

    /** 最左侧开始: 不在滑动窗口内的全部移除 */
    while (deque[0] < left) {
      deque.shift();
    }

    /** 最右侧开始: 小于当前滑动进来的全部移除 */
    while (nums[deque[deque.length - 1]] < nums[right]) {
      deque.pop();
    }

    /** 存储下标 */
    deque.push(right);
    if (left >= 0) results.push(nums[deque[0]]);
  }
  return results;
};
```

## 最小覆盖子串 (可变窗口)

- leetcode: https://leetcode.cn/problems/minimum-window-substring/

```js
 var minWindow = function(s, t) {
  /** 结果 */
  let min = "";
  /** 定义窗口比较值: map 对象 */
  const elements = new Map();
  for (let char of t) {
    if (elements.has(char)) elements.set(char, elements.get(char) + 1);
    else elements.set(char, 1);
  }
  let totalElemets = elements.size;
  /** 初始化窗口边界 */
  let [left, right] = [0, 0];

  for (; right < s.length; right += 1) {
    if (elements.has(s[right])) {
      /** 1、不断增加 right 使滑动窗口增大，直到窗口包含了 t 的所有元素 */
      elements.set(s[right], elements.get(s[right]) - 1);
      if (elements.get(s[right]) === 0) totalElemets -= 1;
    }
    while (totalElemets === 0) {
      /** 2、包含所有元素之后记录结果 */
      const newMin = s.slice(left, right + 1);
      if (!min || newMin.length < min.length) min = newMin;
      /** 3、不断增加 left 使滑动窗口缩小，直到窗口包含了 t - 1 个元素 */
      if (elements.has(s[left])) {
        elements.set(s[left], elements.get(s[left]) + 1);
        if (elements.get(s[left]) === 1) totalElemets += 1;
      }
      left += 1;
    }
  }
  return min;
};
```

## 长度最小的子数组 (可变窗口)

- leetcode: https://leetcode.cn/problems/minimum-size-subarray-sum/

```js
var minSubArrayLen = function(target, nums) {
  /** 结果 */
  let min = Infinity;
  /** 定义窗口比较值: map 对象 */
  let sum = 0;
  /** 初始化窗口边界 */
  let [left, right] = [0, 0];

  for (; right < nums.length; right += 1) {
    sum += nums[right];
    while(sum >= target) {
      min = Math.min(right - left + 1, min);
      sum -= nums[left];
      left += 1;
    }
  }
  return min === Infinity ? 0 : min;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
