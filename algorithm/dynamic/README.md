## 简介

> 算法-动态规划学习笔记。

## 多少种不同方法可以爬到楼顶

leetcode: https://leetcode.cn/problems/climbing-stairs

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  /** a[i]: 代表爬第 i 层楼所需要的步数 */
  /** a[i] = a[i - 1] + a[i - 2] */
  const a = [];
  a[0] = 1;
  a[1] = 2;
  for (let i = 2; i < n; i += 1) {
    a[i] = a[i-1] + a[i - 2];
  }
  return a[n - 1];
};
```

## 零钱兑换最少数量

leetcode: https://leetcode.cn/problems/coin-change

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  /** a[i]: 代表爬凑 i 钱所需要的最少的硬币个数 */
  /** a[i] = Math.min(a[i], a[i - coins[j]] + 1) */
  const a = [];
  a[0] = 0;
  for (let i = 1; i < amount + 1; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (!a[i]) a[i] = Infinity;
      if (i >= coins[j]) {
        a[i] = Math.min(a[i], a[i - coins[j]] + 1);
      }
    }
  }
  return a[amount] === Infinity ? -1 : a[amount];
};
```

## 和最大连续子序列值

leetcode: https://leetcode.cn/problems/maximum-subarray

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  /** a[i]: 代表数组第 i 序号最大和的连续子数组 */
  /** a[i] = Math.max(a[i - 1] + nums[i], a[i - 1]) */
  const a = [];
  a[0] = nums[0];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    a[i] = Math.max(a[i - 1] + nums[i], nums[i]);
  }
  return Math.max.apply(null, a);
};
```

## 积最大连续子序列值

leetcode: https://leetcode.cn/problems/maximum-product-subarray

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  /** a[i]: 代表数组第 i 序号最大积的连续子数组最小和最大 */
  /** a[i][0] = Math.min(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]); */
  /** a[i][1] = Math.max(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]); */
  const a = [];
  a[0] = [[nums[0], nums[0]]];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (!a[i]) a[i] = [];
    a[i][0] = Math.min(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]);
    a[i][1] = Math.max(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]);
  }
  return Math.max.apply(null, a.reduce((a, b) => a.concat(b)));
};
```

## 最长上升子序列长度

leetcode: https://leetcode.cn/problems/longest-increasing-subsequence

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  /** a[i]: 代表数组第 i 序列时最长上升子序列长度 */
  /** a[i] = 如下判断 */
  const a = [];
  a[0] = 1;
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (!a[i]) a[i] = a[0];
    for (j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) a[i] = Math.max(a[j] + 1, a[i]);
    }
  }
  return Math.max.apply(null, a)
};
```

## 三角形从顶到低最小路径和

leetcode: https://leetcode.cn/problems/triangle

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  /** a[i][j]: 代表某个位置从底部到当前位置最小路径和 */
  /** a[i - 1][j] = Math.min(a[i][j], a[i][j + 1]) + triangle[i - 1][j]; */
  const a = [];
  const len = triangle.length - 1;
  a[len] = triangle[len];
  for (let i = len; i > 0; i -= 1) {
    if (!a[i - 1]) a[i - 1] = [];
    for (j = 0, len2 = triangle[i].length; j < len2; j += 1) {
      a[i - 1][j] = Math.min(a[i][j], a[i][j + 1]) + triangle[i - 1][j];
    }
  }
  return a[0][0];
};
```

## 最短编辑距离

leetcode: https://leetcode.cn/problems/edit-distance

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  /** a[i][j]: 代表 word1 的第 i 个单词到 word2 的第 j 个单词所使用的最少操作数 */
  /** a[i][j] = Math.min(a[i - 1][j], a[i][j - 1], a[i - 1][j - 1]) + 1 */
  const a = [];
  for (let i = 0, len = word1.length + 1; i < len; i += 1) {
    a[i] = [];
    for (let j = 0, len2 = word2.length + 1; j < len2; j += 1) {
      if (i === 0) {
        a[i][j] = j;
      } else if (j === 0) {
        a[i][j] = i;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          a[i][j] = a[i - 1][j - 1];
        } else {
          a[i][j] = Math.min(a[i - 1][j], a[i][j - 1], a[i - 1][j - 1]) + 1;
        }
      }
    }
  }

  return a[word1.length][word2.length];
};
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
