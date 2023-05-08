## 简介

> 算法-动态规划学习笔记。

## 多少种不同方法可以爬到楼顶

- leetcode: https://leetcode.cn/problems/climbing-stairs

```js
var climbStairs = function(n) {
  /** dp[i] 代表爬到第 i 层的方法数量 */
  const dp = [1, 2];
  for (let i = 2; i < n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};
```

## 和最大连续子序列值

- leetcode: https://leetcode.cn/problems/maximum-subarray

```js
var maxSubArray = function(nums) {
 /** dp[i] 代表以 nums 第 i 个数结尾最大子数组 */
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i += 1) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max.apply(null, dp);
};
```

## 积最大连续子序列值

- leetcode: https://leetcode.cn/problems/maximum-product-subarray

```js
var maxProduct = function(nums) {
  /** dp[i][0] dp[i][1] 分别代表以 nums 第 i 个数结尾最大和最小数 */
  const dp = [[nums[0], nums[0]]];
  for (let i = 1; i < nums.length; i += 1) {
    const a = dp[i - 1][0] * nums[i];
    const b = dp[i - 1][1] * nums[i];
    dp[i] = [Math.max(a, b, nums[i]), Math.min(a, b, nums[i])];
  }
  return Math.max.apply(null, dp.map(i => i[0]));
};
```

## 最长上升子序列长度

- leetcode: https://leetcode.cn/problems/longest-increasing-subsequence

```js
var lengthOfLIS = function(nums) {
  /** dp[i] 代表数组 nums 以第 i 个数结尾时最长严格递增子序列的长度 */
  const dp = [1];
  for (let i = 1; i < nums.length; i += 1) {
    if (!dp[i]) dp[i] = -Infinity;
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      } else {
        dp[i] = Math.max(dp[i], 1);
      }
    }
  }
  return Math.max.apply(null, dp);
};
```

## 零钱兑换最少数量

- leetcode: https://leetcode.cn/problems/coin-change

```js
var coinChange = function(coins, amount) {
  /** dp[i] 代表兑换 i 数量的金额需要的最少硬币数 */
  const dp = [0];
  for (let i = 1; i <= amount; i += 1) {
    if (!dp[i]) dp[i] = Infinity;
    for (let j = 0; j < coins.length; j += 1) {
      if (i - coins[j] >= 0) dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
```

## 三角形从顶到低最小路径和

- leetcode: https://leetcode.cn/problems/triangle

```js
var minimumTotal = function(triangle) {
  /** dp[i][j] 代表从底部到顶部位置 [i,j] 时和最小值 */
  const dp = []
  for (let i = triangle.length - 1; i >= 0; i -= 1) {
      if (!dp[i]) dp[i] = [];
      if (i === triangle.length - 1) {
        dp[i] = triangle[i];
      } else {
        for (let j = triangle[i].length - 1; j >= 0; j -= 1) {
          dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
        }
      }
  }
  return dp[0][0];
};
```

## 矩阵最小路径和

- leetcode: https://leetcode.cn/problems/minimum-path-sum/

```js
var minPathSum = function(grid) {
  /** dp[i][j] 代表从左上角 [0, 0] 到 [i, j] 位置最短路径和 */
  const dp = [];
  for (let i = 0; i < grid.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j < grid[i].length; j += 1) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j];
      } else if (i === 0) {
        /** 只能从左面来 */
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      } else if (j === 0) {
        /** 只能从上面来 */
        dp[i][j] = dp[i - 1][j] + grid[i][j]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }
  }
  return dp[grid.length - 1][grid[0].length - 1];
};
```

## 最短编辑距离

- leetcode: https://leetcode.cn/problems/edit-distance

```js
var minDistance = function(word1, word2) {
  /** dp[i][j] 代表 word1 第 i 个单词及之前到 word2 第 j 个单词及之前 变换所使用的最少操作数 */
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
          /** word1 第 i 个单词和 word2 第 j 个单词一样, 编辑距离和前个序列相同 */
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

## 最长公共子串长度(非连续)

- leetcode: https://leetcode.cn/problems/longest-common-subsequence/

```js
var longestCommonSubsequence = function(text1, text2) {
  /** dp[i][j] 代表 text1 第 i 个单词及之前和 text2 第 j 个单词及之前最长公共子串长度 */
  const dp = [];
  for (let i = 0; i <= text1.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= text2.length; j += 1) {
      if (i === 0) {
        dp[i][j] = 0;
      } else if (j === 0) {
        dp[i][j] = 0;
      } else {
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
  }
  return dp[text1.length][text2.length];
};
```

## 最长重复子数组长度 (连续)

- leetcode: https://leetcode.cn/problems/maximum-length-of-repeated-subarray/

```js
var findLength = function(nums1, nums2) {
  /** dp[i][j] 代表数组 nums1 第 i 个元素结尾时和数组 nums2 第 j 个元素结尾时最长子数组长度 */
  let res = 0;
  const dp = [];
  for (let i = 0; i <= nums1.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= nums2.length; j += 1) {
      if (i === 0) {
        dp[i][j] = 0;
      } else if (j === 0) {
        dp[i][j] = 0;
      } else {
        if (nums1[i - 1] === nums2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = 0;
        }
        res = Math.max(res, dp[i][j]);
      }
    }
  }
  return res;
};
```

## 最长无重复子串长度

- leetcode: https://leetcode.cn/problems/longest-substring-without-repeating-characters/

```js
var lengthOfLongestSubstring = function(s) {
  if (!s.length) return 0;
  /** dp[i] 代表包含 s 第 i 位字符的最长字串 */
  const dp = [s[0]];
  for (let i = 1; i < s.length; i += 1) {
    const index = dp[i - 1].indexOf(s[i]);
    if (index < 0) {
      dp[i] = dp[i - 1] + s[i];
    } else {
      dp[i] = dp[i - 1].slice(index + 1) + s[i];
    }
  }
  return  Math.max.apply(null, dp.map(i => i.length));
};
```

## 打家劫舍

- leetcode: https://leetcode.cn/problems/house-robber/

```js
var rob = function(nums) {
  if (!nums.length) return 0
  /** dp[i][0] 代表打劫第 i 家时, 选择偷盗, 最大收益 */
  /** dp[i][0] 代表偷盗第 i 家时, 选择不偷盗, 最大收益 */
  const dp = [[nums[0], 0]];
  for (let i = 1; i < nums.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    dp[i][0] = dp[i - 1][1] + nums[i];
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1]);
  }
  return Math.max.apply(null, dp.reduce((a, b) => a.concat(b)));
};
```

## 接雨水

- leetcode: https://leetcode.cn/problems/trapping-rain-water/

```js
var trap = function(height) {
  if (!height.length) return 0;
  /** leftMax[i] 代表第 i 位置及其左侧最大值 */
  const leftMax = [];
  for (let i = 0; i < height.length; i += 1) {
      if (i === 0) leftMax[i] = height[i];
      else leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }
  /** rightMax[i] 代表第 i 位置及其右侧最大值 */
  const rightMax = [];
  for (let i = height.length - 1; i >=0; i -= 1) {
      if (i === height.length - 1) rightMax[i] = height[i];
      else rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }
  /** dp[i] 代表位置 i 可以接收的雨水数量 */
  const dp = [0];
  for (let i = 1; i < height.length - 1; i += 1) {
      dp[i] = Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return dp.reduce((a, b) => a + b);
};
```

## 股票系列

#### 买卖 1 次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

```js
var maxProfit = function(prices) {
  let max = 0;
  /** dp[i] 代表第 i 天及之前最小值 */
  const dp = [prices[0]];
  for (let i = 1; i < prices.length; i += 1) {
    dp[i] = Math.min(dp[i - 1], prices[i]);
    max = Math.max(prices[i] - dp[i], max);
  }
  return max;
};
```

#### 买卖无数次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/

```js
var maxProfit = function(prices) {
  /** dp[i][0] 代表第 i 天, 当前持有股票, 最大收益 */
  /** dp[i][1] 代表第 i 天, 当前不持有股票, 最大收益 */
  const dp = [[-prices[0], 0]];
  for (let i = 1; i < prices.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][0] + prices[i], dp[i - 1][1]);
  }
  return dp[prices.length - 1][1];
};
```

#### 冷冻 1 天

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/

```js
var maxProfit = function(prices) {
  /** dp[i][0] 代表 第 i 天, 当前持有股票，最大收益 */
  /** dp[i][0] 代表 第 i 天, 当前不持有股票，最大收益 */
  const dp = [[-prices[0], 0]];
  for (let i = 1; i < prices.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 2] ? dp[i - 2][1] - prices[i] : -prices[i]);
    dp[i][1] = Math.max(dp[i - 1][0] + prices[i], dp[i - 1][1]);
  }
  return dp[prices.length - 1][1];
};
```

#### 含有手续费

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

```js
var maxProfit = function(prices, fee) {
  /** dp[i][0] 代表第 i 天, 当前持有股票, 最大收益 */
  /** dp[i][1] 代表第 i 天, 当前不持有股票, 最大收益 */
  const dp = [[-prices[0], 0]];
  for (let i = 1; i < prices.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][0] + prices[i] - fee, dp[i - 1][1]);
  }
  return dp[prices.length - 1][1];
};
```

#### 买卖 2 次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/

```js
var maxProfit = function(prices) {
  /** dp[i][0] 代表第 i 天, 没做过任何操作, 最大收益 */
  /** dp[i][1] 代表第 i 天, 总共第一次买入, 最大收益 */
  /** dp[i][2] 代表第 i 天, 总共第一次卖出, 最大收益 */
  /** dp[i][3] 代表第 i 天, 总共第二次买入, 最大收益 */
  /** dp[i][4] 代表第 i 天, 总共第二次卖出, 最大收益 */
  const dp = [[0, -prices[0], 0, -prices[0], 0]];
  for (let i = 1; i < prices.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    dp[i][0] = dp[i - 1][0];
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1]);
    dp[i][2] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][2]);
    dp[i][3] = Math.max(dp[i - 1][2] - prices[i], dp[i - 1][3]);
    dp[i][4] = Math.max(dp[i - 1][3] + prices[i], dp[i - 1][4]);
  }
  return dp[prices.length - 1][4];
};
```

#### 买卖 k 次

- leetcode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/

```js
var maxProfit = function(k, prices) {
  /** dp[i][j][0] 代表 第 i 天, 买卖了 j 次(卖出才算加1), 当前持有股票, 最大收益 */
  /** dp[i][j][1] 代表 第 i 天, 买卖了 j 次(卖出才算加1), 当前不持有股票, 最大收益 */
  const dp = [];
  for (let i = 0; i < prices.length; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= k; j += 1) {
      if (i === 0) {
        dp[i][j] = [-prices[i], 0]
      } else if (j === 0) {
        dp[i][j] = [-Math.min.apply(null, prices.slice(0, i + 1)), 0];
      } else {
        if (!dp[i][j]) dp[i][j] = [];
        dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] - prices[i]);
        dp[i][j][1] = Math.max(dp[i - 1][j - 1][0] + prices[i], dp[i - 1][j][1]);
      }
    }
  }
  return dp[prices.length - 1][k][1];
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
