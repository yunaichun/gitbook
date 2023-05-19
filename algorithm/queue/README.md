## 简介

> 算法-队列学习笔记。

#### 滑动窗口

> 滑动窗口一般用于求连续的, 可分为固定窗口和可变窗口

- 固定窗口
- 可变窗口
  - 最小满足: 在满足条件, 每次移动 left, 循环中计算结果
  - 最大满足: 在满足条件, 每次移动 right 时均计算结果
  - 所有满足: 用下面的前缀和方法

#### 前缀和

> 前缀和一般用于求连续的, 所有满足条件的总数

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

## 最小覆盖子串 (可变窗口 + 最小满足)

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

## 长度最小的连续子数组 (可变窗口 + 最小满足)

- https://leetcode.cn/problems/minimum-size-subarray-sum/

```js
var minSubArrayLen = function(target, nums) {
  /** 结果 */
  let min = 0;
  /** 定义窗口比较值: map 对象 */
  let sum = 0;
  /** 初始化窗口边界 */
  let [left, right] = [0, 0];
  
  for (; right < nums.length; right += 1) {
    sum += nums[right];
    
    while(sum >= target) {
      const newMin = right - left + 1
      if (!min || newMin < min) min = newMin;
      min = Math.min(right - left + 1, min);
      sum -= nums[left];
      left += 1;
    }
  }

  return min;
};
```

## 最小替换子串得到平衡字符串 (可变窗口 + 最小满足)

- https://leetcode.cn/problems/replace-the-substring-for-balanced-string/

```js
/** 逆向思维: 剩下的字符串均小于等于 leng/4; 当前的连续的窗口才符合 */
var balancedString = function(s) {
  /** 滑动窗口结果 */
  let min = 0;
  /** 滑动窗口条件 */
  const average = s.length / 4;
  const map = new Map();
  for (let i = 0; i < s.length; i += 1) {
    if (!map.has(s[i])) map.set(s[i], 1);
    else map.set(s[i], map.get(s[i]) + 1);
  }
  /** 滑动窗口边界 */
  let [left, right] = [0, 0];

  /** 全部包含不符合 */
  if (checkRemaining(map, average)) return min;
  
  for (; right < s.length; right += 1) {
    map.set(s[right], map.get(s[right]) - 1);

    while(checkRemaining(map, average)) {
      const newMin = right - left + 1;
      if (!min || newMin < min) min = newMin;
      map.set(s[left], map.get(s[left])  + 1);
      left += 1;
    }
  }

  return min;
};

var checkRemaining = function(map, average) {
  const q = map.get('Q') || 0;
  const w = map.get('W') || 0;
  const e = map.get('E') || 0;
  const r = map.get('R') || 0;
  return q <= average && w <= average && e <= average && r <= average;
}
```

## 将 x 减到 0 的最小操作数 (可变窗口 + 最小满足)

- https://leetcode.cn/problems/minimum-operations-to-reduce-x-to-zero/

```js
/** 逆向思维: 剩下的小于等于 x; 当前的连续的窗口才符合 */
var minOperations = function(nums, x) {
  /** 滑动窗口结果 */
  let min = -1;
  /** 滑动窗口条件 */
  let sum = 0;
  const all = nums.reduce((a, b) => a + b, 0)
  /** 滑动窗口边界 */
  let [left, right] = [0, 0];

  /** 全部包含不符合 */
  if (all < x) return min;

  for (; right < nums.length; right += 1) {
    sum += nums[right];

    while (all - sum <= x) {
      if (all - sum === x) {
      const newMin = nums.length - (right - left + 1);
      if (min === -1 || (newMin >= 0 && newMin < min)) min = newMin;
      }
      sum -= nums[left];
      left += 1;
    }
  }

  return min;
};
```

## 收集连续水果最大数量 (可变窗口 + 最大满足)

- https://leetcode.cn/problems/fruit-into-baskets/

```js
/** 转换题意: 滑动窗口的元素种类最多允许有 2 个, 小于等于 2 个均可参与计算 */
var totalFruit = function(fruits) {
  /** 滑动窗口结果 */
  let max = 0;
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

## 最大连续 1 的个数 (可变窗口 + 最大满足)

- https://leetcode.cn/problems/max-consecutive-ones-iii/

```js
/** 转换题意: 滑动窗口的子数组最多允许有 K 个 0, 小于等于均可参与计算 */
var longestOnes = function(nums, k) {
  /** 滑动窗口结果 */
  let max = 0;
  /** 滑动窗口条件 */
  let zeros = 0;
  /** 滑动窗口边界 */
  let [left, right] = [0, 0];

  for (; right < nums.length; right += 1) {
    if (nums[right] === 0) zeros += 1;

    while (zeros > k) {
      if (nums[left] === 0) zeros -= 1;
      left += 1;
    }

    max = Math.max(right - left + 1, max);
  }

  return max;
}
```

## 和相同的连续子数组个数 (前缀和 + 所有满足)

- https://leetcode.cn/problems/binary-subarrays-with-sum/

```js
var numSubarraysWithSum = function(nums, goal) {
  /** 前缀和 */
  const prevSums = [0];
  for (let i = 0; i < nums.length; i += 1) {
    prevSums[i + 1] = prevSums[i] + nums[i];
  }

  /** 统计个数 */
  let count = 0;
  for (let i = 0; i < prevSums.length - 1; i += 1) {
    for (let j = i + 1; j < prevSums.length; j += 1) {
      if (prevSums[j] - prevSums[i] === goal) count += 1;
    }
  }

  return count;
}
// nums = [0, 0, 1, 0, 1, 0, 0]; goal = 2
```

## 优美子数组个数 (前缀和 + 所有满足)

- https://leetcode.cn/problems/count-number-of-nice-subarrays/

```js
var numberOfSubarrays = function(nums, k) {
  const prevSums = [0];
  for (let i = 0; i < nums.length; i += 1) {
    prevSums[i + 1] = prevSums[i] + (nums[i] & 1);
  }
  let res = 0;
  for (let i = 0; i < prevSums.length - 1; i += 1) {
    for (let j = i + 1; j < prevSums.length; j += 1) {
      if (prevSums[j] - prevSums[i] === k) res += 1;
    }
  }
  return res;
}
// nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k = 2
```

## 和为 K 的连续子数组 (前缀和 + 所有满足)

- https://leetcode.cn/problems/subarray-sum-equals-k/submissions/

```js
var subarraySum = function(nums, k) {
  const prevSums = [0];
  for (let i = 0; i < nums.length; i += 1) {
    prevSums[i + 1] = prevSums[i] + nums[i];
  }

  let count = 0;
  for (let i = 0; i < prevSums.length - 1; i += 1) {
    for (j = i + 1; j < prevSums.length; j += 1) {
      if (prevSums[j] - prevSums[i] === k) count += 1; 
    }
  }
  return count;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
