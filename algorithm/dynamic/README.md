## 简介

> 算法-动态规划学习笔记。

## 多少种不同方法可以爬到楼顶

- leetcode: https://leetcode.cn/problems/climbing-stairs

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /** dp[i] 代表爬第 i + 1 层楼所需要的步数 */
  const dp = [1, 2];
  for (let i = 2; i < n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};
```

## 零钱兑换最少数量

- leetcode: https://leetcode.cn/problems/coin-change

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  /** a[i] 代表兑换 i 数量需要的最少的硬币个数 */
  const dp = [0];
  for (let i = 1; i <= amount; i += 1) {
    if (!dp[i]) dp[i] = Infinity;
    for (let j = 0, len = coins.length; j < len; j += 1) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
```

## 和最大连续子序列值

- leetcode: https://leetcode.cn/problems/maximum-subarray

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  /** dp[i] 代表【以数组第 i + 1 个数结尾的最大连续子数组】的最大和 */
  const dp = [nums[0]];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max.apply(null, dp);
};
```

## 积最大连续子序列值

- leetcode: https://leetcode.cn/problems/maximum-product-subarray

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  /** dp[i][0] 代表【以数组第 i + 1 个数结尾的最大连续子数组】乘积最大值 */
  /** dp[i][1] 代表【以数组第 i + 1 个数结尾的最大连续子数组】乘积最小值 */
  const dp = [[nums[0], nums[0]]];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]),
      Math.min(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]),
    ];
  }
  return Math.max.apply(
    null,
    dp.map((product) => product[0])
  );
};
```

## 最长上升子序列长度

- leetcode: https://leetcode.cn/problems/longest-increasing-subsequence

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  /** dp[i] 代表【以数组第 i + 1 个数结尾的最长严格递增子序列】的长度 */
  const dp = [1];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (!dp[i]) dp[i] = 1;
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[j] + 1, dp[i]);
    }
  }
  return Math.max.apply(null, dp);
};
```

## 三角形从顶到低最小路径和

- leetcode: https://leetcode.cn/problems/triangle

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  /** dp[i][j] 代表从底部到坐标 (i, j) 最小路径和 */
  const dp = [];
  dp[triangle.length - 1] = triangle[triangle.length - 1];
  for (i = triangle.length - 2; i >= 0; i -= 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0, len = triangle[i].length; j < len; j += 1) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
    }
  }
  return dp[0][0];
};
```

## 最短编辑距离

- leetcode: https://leetcode.cn/problems/edit-distance

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  /** dp[i][j] 代表 word1 第 i 个单词到 word2 第 j 个单词 变换所使用的最少操作数 */
  const dp = [];
  for (let i = 0, len1 = word1.length; i <= len1; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0, len2 = word2.length; j <= len2; j += 1) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          /** dp[i - 1][j]: 增加 1 个单词到 word1 */
          /** dp[i][j - 1]: 增加 1 个单词到 word2 (等价于删除 word1 的一个单词) */
          /** dp[i - 1][j - 1]: 修改 word1 的第 i 个字符和 word2 的第 j 个字符一样 */
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
      }
    }
  }
  return dp[word1.length][word2.length];
};
```

## 股票系列

#### 买卖 1 次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

```js
var maxProfit = function (prices) {
  let max = 0;
  /** dp 代表第 i + 1 天前的最低点 */
  const dp = [prices[0]];
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = Math.min(dp[i - 1], prices[i]);
    max = prices[i] - dp[i];
  }
  return max;
};
```

#### 买卖无数次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/

```js
var maxProfit = function (prices) {
  const dp = [[0, -prices[0]]];
  /** dp[i][0] 代表第 i + 1 天 【不持有股票】 最大收益 */
  /** dp[i][1] 代表第 i + 1 天 【持有股票】 最大收益 */
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]),
      Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]),
    ];
  }
  return dp[prices.length - 1][0];
};
```

#### 买卖 2 次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/

```js
var maxProfit = function (prices) {
  const dp = [[0, -prices[0], 0, -prices[0], 0]];
  /** dp[i][0] 代表第 i + 1 天 【不做任何操作】 最大收益 */
  /** dp[i][1] 代表第 i + 1 天状态为 【第一次买入】 最大收益 */
  /** dp[i][2] 代表第 i + 1 天状态为 【第一次卖出】 最大收益 */
  /** dp[i][3] 代表第 i + 1 天状态为 【第二次买入】 最大收益 */
  /** dp[i][4] 代表第 i + 1 天状态为 【第二次卖出】 最大收益 */
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      dp[i - 1][0],
      Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1]),
      Math.max(dp[i - 1][1] + prices[i], dp[i - 1][2]),
      Math.max(dp[i - 1][2] - prices[i], dp[i - 1][3]),
      Math.max(dp[i - 1][3] + prices[i], dp[i - 1][4]),
    ];
  }
  return dp[prices.length - 1][4];
};
```

#### 买卖 k 次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/

```js
var maxProfit = function (k, prices) {
  /** dp[i][j][0]: 第 i + 1 天 买卖 j 次, 不持有股票的最大收益 */
  /** dp[i][j][1]: 第 i + 1 天 买卖 j 次, 持有股票的最大收益 */
  const dp = [];
  for (let i = 0, len = prices.length; i < len; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= k; j += 1) {
      if (i === 0) {
        dp[i][j] = [0, -prices[i]];
      } else if (j === 0) {
        dp[i][j] = [0, Math.max(dp[i - 1][j][1], dp[i - 1][j][0] - prices[i])];
      } else {
        dp[i][j] = [
          Math.max(dp[i - 1][j][0], dp[i - 1][j - 1][1] + prices[i]),
          Math.max(dp[i - 1][j][1], dp[i - 1][j][0] - prices[i]),
        ];
      }
    }
  }

  return Math.max.apply(
    null,
    dp[prices.length - 1].map((kProfit) => kProfit[0])
  );
};
```

#### 冷冻 1 天

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/

```js
var maxProfit = function (prices) {
  const dp = [[0, -prices[0]]];
  /** dp[i][0] 代表第 i 天 【不持有股票】 最大收益 */
  /** dp[i][1] 代表第 i 天 【持有股票】 最大收益 */
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]),
      /** 今天持有股票 = 昨天持有股票 + (昨天不持有股票 - prices[i]) */
      /** 昨天不持有股票 = 前天不持有股票 + 前天持有股票&昨天卖出=>今天无法买入(忽略掉) */
      Math.max(dp[i - 1][1], (i - 2 > 0 ? dp[i - 2][0] : 0) - prices[i]),
    ];
  }
  return dp[prices.length - 1][0];
};
```

#### 含有手续费

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

```js
var maxProfit = function (prices, fee) {
  const dp = [[0, -prices[0]]];
  /** dp[i][0] 代表第 i + 1 天 【不持有股票】 最大收益 */
  /** dp[i][1] 代表第 i + 1 天 【持有股票】 最大收益 */
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee),
      Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]),
    ];
  }
  return dp[prices.length - 1][0];
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
