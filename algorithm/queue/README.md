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

- https://leetcode.cn/problems/sliding-window-maximum/

```js
var maxSlidingWindow = function(nums, k) {
  /** 滑动窗口结果 */
  const results = [];
  /** 滑动窗口条件 */
  const queue = [];
  /** 滑动窗口边界 */
  let [left, right] = [0, 0];

  for (; right < nums.length; right += 1) {
    left = right - k + 1;
    /** 开始元素不在范围内的移除 */
    while (queue[0] < left) {
      queue.shift();
    }
    /** 结尾元素小于当前的全部移除 */
    while (nums[right] >= nums[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(right);
    if (left >= 0) results.push(nums[queue[0]]);
  }

  return results;
};
```

## 最小覆盖子串 (可变窗口)

- 最小覆盖子串: https://leetcode.cn/problems/minimum-window-substring/
- 最小覆盖子串首尾索引: https://leetcode.cn/problems/shortest-supersequence-lcci/
- 字母异位词判断: https://leetcode.cn/problems/permutation-in-string/
- 字母异位词起始索引: https://leetcode.cn/problems/find-all-anagrams-in-a-string/

```js
 var minWindow = function(s, t) {
  /** 滑动窗口结果 */
  let min = "";
  /** 滑动窗口条件 */
  const elements = new Map();
  for (let char of t) {
    if (!elements.has(char)) elements.set(char, 1);
    else elements.set(char, elements.get(char) + 1);
  }
  let totalElemets = elements.size;
  /** 滑动窗口边界 */
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

## 长度最小的连续子数组 (可变窗口)

- https://leetcode.cn/problems/minimum-size-subarray-sum/

```js
var minSubArrayLen = function(target, nums) {
  /** 滑动窗口结果 */
  let min = Infinity;
  /** 滑动窗口条件 */
  let sum = 0;
  /** 滑动窗口边界 */
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

## 水果成篮 (可变窗口)

- https://leetcode.cn/problems/fruit-into-baskets /

```js
var totalFruit = function(fruits) {
  /** 滑动窗口结果 */
  let max = -Infinity;
  /** 滑动窗口条件 */
  const elements = new Map();
  /** 滑动窗口边界 */
  let [left, right] = [0, 0];

  for (; right < fruits.length; right += 1) {
    if (!elements.has(fruits[right])) elements.set(fruits[right], 1);
    else elements.set(fruits[right], elements.get(fruits[right]) + 1);

    while (elements.size > 2) {
      if (elements.has(fruits[left])) elements.set(fruits[left], elements.get(fruits[left]) - 1);
      if (elements.get(fruits[left]) === 0) elements.delete(fruits[left]);
      left += 1;
    }
    max = Math.max(right - left + 1, max);
  }
  return max;
};
```

## 和相同的二元子数组 (可变窗口 + 双指针)

- https://leetcode.cn/problems/binary-subarrays-with-sum/

```js
var numSubarraysWithSum = function(nums, goal) {
  /** 滑动窗口结果 */
  let res = 0;
  /** 滑动窗口条件 */
  let [sum1, sum2] = [0, 0];
  /** 滑动窗口边界 */
  let [left1, left2, right] = [0, 0, 0];
  for (; right < nums.length; right += 1) {
    sum1 += nums[right];
    sum2 += nums[right];

    /** 此次遍历得到 left1: 满足 sum1 === goal 时 left1 的值 */
    while (left1 <= right && sum1 > goal) {
      sum1 -= nums[left1]; 
      left1 += 1;
    }

    /** 此次遍历得到 left2: 满足 sum2 < goal 时 left2 的值 */
    while (left2 <= right && sum2 >= goal) {
      sum2 -= nums[left2];
      left2 += 1;
    }

    console.log(left1, left2, right);
    /** left2 - left1 中间的均满足条件 */
    res += left2 - left1;
  }
  return res;
};
```
## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
